import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface Message {
  role: 'user' | 'assistant'
  content: string
  rating?: 'helpful' | 'not helpful'
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      setMessages([{ role: 'assistant', content: t('greeting') }])
    }
  }, [])//t error
  // }, [t])//t error

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = { role: 'user', content: inputMessage }
      setMessages(prevMessages => [...prevMessages, newMessage])
      setInputMessage('')
      setIsTyping(true)

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: t('autoReply')
        } as Message])
        setIsTyping(false)
      }, 1000)
    }
  }, [inputMessage, t])

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