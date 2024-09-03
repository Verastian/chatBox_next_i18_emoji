import { Message, ContentItem, Rating } from '@/interface'
import { create } from 'zustand'



interface ChatState {
    messages: Message[]
    inputMessage: string
    isTyping: boolean
    isInitialized: boolean
    ratings: Rating[]
    setMessages: (messages: Message[]) => void
    setInputMessage: (inputMessage: string) => void
    setIsTyping: (isTyping: boolean) => void
    addMessage: (message: Message) => void
    handleSendMessage: () => Promise<void>
    handleRating: (messageId: string, value: 'helpful' | 'not helpful') => void
    initializeChat: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    inputMessage: '',
    isTyping: false,
    isInitialized: false,
    ratings: [],
    setMessages: (messages) => set({ messages }),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setIsTyping: (isTyping) => set({ isTyping }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    handleSendMessage: async () => {
        const { inputMessage, addMessage, setInputMessage, setIsTyping } = get()
        if (inputMessage.trim() !== '') {
            const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: [{ type: 'text', content: inputMessage }] }
            addMessage(newUserMessage)
            setInputMessage('')
            setIsTyping(true)
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: inputMessage }),
                })
                if (!response.ok) {
                    throw new Error('Failed to get response from server')
                }
                const data = await response.json()
                const { response: res, id } = data.response
                const newAssistantMessage: Message = { id, role: 'assistant', content: res }
                addMessage(newAssistantMessage)
            } catch (error) {
                console.error('Error:', error)
                const errorMessage: Message = {
                    id: 'e' + Date.now().toString(),
                    role: 'assistant',
                    content: [{ type: 'text', content: 'Lo siento, hubo un error al procesar tu mensaje.' }]
                }
                addMessage(errorMessage)
            } finally {
                setIsTyping(false)
            }
        }
    },
    handleRating: (messageId: string, value: 'helpful' | 'not helpful') => set((state) => {
        const newRating: Rating = { messageId, value }
        const existingRatingIndex = state.ratings.findIndex(r => r.messageId === messageId)
        let updatedRatings: Rating[]

        if (existingRatingIndex !== -1) {
            // Update existing rating
            updatedRatings = [...state.ratings]
            updatedRatings[existingRatingIndex] = newRating
        } else {
            // Add new rating
            updatedRatings = [...state.ratings, newRating]
        }

        // Log the rating to the console
        console.log(`Message ${messageId} rated: ${value}`)

        return { ratings: updatedRatings }
    }),
    initializeChat: () => {
        const { isInitialized, addMessage } = get()
        if (!isInitialized) {
            const welcomeMessage: Message = {
                role: 'assistant',
                content: [
                    { type: 'text', content: '¡Hola! 👋 Bienvenido, mi nombre es Verastian 🤓, soy desarrollador web . ¿En qué puedo ayudarte hoy?' },
                ],
                id: 'welcome'
            }
            addMessage(welcomeMessage)
            set({ isInitialized: true })
        }
    },
}))