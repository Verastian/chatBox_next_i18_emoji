import { create } from 'zustand'

interface Message {
    role: 'user' | 'assistant'
    content: string
    rating?: 'helpful' | 'not helpful'
}

interface ChatState {
    messages: Message[]
    inputMessage: string
    isTyping: boolean
    setMessages: (messages: Message[]) => void
    setInputMessage: (inputMessage: string) => void
    setIsTyping: (isTyping: boolean) => void
    addMessage: (message: Message) => void
    handleSendMessage: () => Promise<void>
    rateMessage: (messageIndex: number, rating: 'helpful' | 'not helpful') => void
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    inputMessage: '',
    isTyping: false,
    setMessages: (messages) => set({ messages }),
    setInputMessage: (inputMessage) => set({ inputMessage }),
    setIsTyping: (isTyping) => set({ isTyping }),
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    handleSendMessage: async () => {
        const { inputMessage, addMessage, setInputMessage, setIsTyping } = get()
        if (inputMessage.trim() !== '') {
            const newUserMessage: Message = { role: 'user', content: inputMessage }
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
                const errorMessage: Message = { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu mensaje.' }
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
}))