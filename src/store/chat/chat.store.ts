import { Message, ContentItem } from '@/interface'
import { create } from 'zustand'

interface ChatState {
    messages: Message[]
    inputMessage: string
    isTyping: boolean
    isInitialized: boolean
    setMessages: (messages: Message[]) => void
    setInputMessage: (inputMessage: string) => void
    setIsTyping: (isTyping: boolean) => void
    addMessage: (message: Message) => void
    handleSendMessage: () => Promise<void>
    rateMessage: (messageIndex: number, rating: 'helpful' | 'not helpful') => void
    initializeChat: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    inputMessage: '',
    isTyping: false,
    isInitialized: false,
    setMessages: (messages) => set({ messages }),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setIsTyping: (isTyping) => set({ isTyping }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    handleSendMessage: async () => {
        const { inputMessage, addMessage, setInputMessage, setIsTyping } = get()
        if (inputMessage.trim() !== '') {
            const newUserMessage: Message = { role: 'user', content: [{ type: 'text', content: inputMessage }] }
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
                const newAssistantMessage: Message = { role: 'assistant', content: data.response }
                addMessage(newAssistantMessage)
            } catch (error) {
                console.error('Error:', error)
                const errorMessage: Message = {
                    role: 'assistant',
                    content: [{ type: 'text', content: 'Lo siento, hubo un error al procesar tu mensaje.' }]
                }
                addMessage(errorMessage)
            } finally {
                setIsTyping(false)
            }
        }
    },
    rateMessage: (messageIndex, rating) => set((state) => ({
        messages: state.messages.map((msg, index) =>
            index === messageIndex ? { ...msg, rating } : msg
        )
    })),

    initializeChat: () => {
        const { isInitialized, addMessage } = get()
        if (!isInitialized) {
            const welcomeMessage: Message = {
                role: 'assistant',
                content: [
                    { type: 'text', content: '¡Hola! Bienvenido, mi nombre es Verastian, soy desarrollador web . ¿En qué puedo ayudarte hoy?' },
                    { type: 'icon', content: 'wave' }
                ]
            }
            addMessage(welcomeMessage)
            set({ isInitialized: true })
        }
    },
}));