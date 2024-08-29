import { useChatStore } from '@/store'
import { useCallback } from 'react'


const useChat = () => {
  const {
    messages,
    inputMessage,
    isTyping,
    setInputMessage,
    addMessage,
    setIsTyping,
    rateMessage,
  } = useChatStore()

  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage = { role: 'user' as const, content: inputMessage }
      addMessage(newUserMessage)
      setInputMessage('')
      setIsTyping(true)

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response from server')
        }

        const data = await response.json()
        const newAssistantMessage = { role: 'assistant' as const, content: data.response }
        addMessage(newAssistantMessage)
      } catch (error) {
        console.error('Error:', error)
        const errorMessage = { role: 'assistant' as const, content: 'Lo siento, hubo un error al procesar tu mensaje.' }
        addMessage(errorMessage)
      } finally {
        setIsTyping(false)
      }
    }
  }, [inputMessage, addMessage, setInputMessage, setIsTyping])

  return {
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    handleSendMessage,
    rateMessage,
  }
}

export default useChat