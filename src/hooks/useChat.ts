import { useState, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  rating?: 'helpful' | 'not helpful'
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)


  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage: Message = { role: 'user', content: inputMessage }
      setMessages(prevMessages => [...prevMessages, newUserMessage])
      setInputMessage('')
      setIsTyping(true)
      try {
        console.log('Sending message:', inputMessage);
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputMessage }),
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to get response from server');
        }
        const data = await response.json();
        console.log('Received data:', data);
        const newAssistantMessage: Message = { role: 'assistant', content: data.response }
        setMessages(prevMessages => [...prevMessages, newAssistantMessage])
      } catch (error) {
        console.error('Error:', error);
        const errorMessage: Message = { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu mensaje.' }
        setMessages(prevMessages => [...prevMessages, errorMessage])
      } finally {
        setIsTyping(false)
      }

    }
  }, [inputMessage])

  const rateMessage = useCallback((messageIndex: number, rating: 'helpful' | 'not helpful') => {
    setMessages(prevMessages => prevMessages.map((msg, index) =>
      index === messageIndex ? { ...msg, rating } : msg
    ))
  }, [])

  return {
    messages,
    inputMessage,
    setInputMessage,
    isTyping,
    handleSendMessage,
    rateMessage
  }
}
export default useChat;