'use client'
import React, { useState, useEffect, useCallback, FC } from 'react'
import { MessageCircle, X, Moon, Sun, Smile, ThumbsUp, ThumbsDown, Send } from 'lucide-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTranslation } from 'react-i18next'

interface Message {
  role: 'user' | 'assistant';
  content: string;
  rating?: 'helpful' | 'not helpful';
}
interface Props {
  isDarkMode: boolean;
}
const MemoizedScrollArea = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className="h-full overflow-y-auto pr-4">{children}</div>
))

const EmojiPicker = React.memo(({ onEmojiSelect }: { onEmojiSelect: (emoji: any) => void }) => (
  <Picker data={data} onEmojiSelect={onEmojiSelect} />
))


export const ChatBox: FC<Props> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { t, i18n } = useTranslation()

  // Load initial messages and theme
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      setMessages([{ role: 'assistant', content: t('greeting') }])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = { role: 'user', content: inputMessage };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputMessage('');
      setIsTyping(true);

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: t('autoReply')
        } as Message]);
        setIsTyping(false);
      }, 1000);
    }
  }, [inputMessage, t]);

  const rateMessage = useCallback((messageIndex: number, rating: 'helpful' | 'not helpful') => {
    setMessages(prevMessages => prevMessages.map((msg, index) =>
      index === messageIndex ? { ...msg, rating } : msg
    ))
  }, [])

  return (
    <div className="fixed bottom-4 right-4">
      <button
        className={`rounded-full w-12 h-12 shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'} flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      {isOpen && (
        <div
          className={`absolute bottom-16 right-0 w-[350px] h-[500px] flex flex-col shadow-2xl transition-all duration-300 ease-in-out animate-[slideIn_0.3s_ease-out] ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg overflow-hidden`}
          role="dialog"
          aria-label={t('chatAssistant')}
          style={{
            backgroundImage: isDarkMode ? 'none' : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        >
          <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-white text-blue-500'} flex items-center justify-center`}>
                  <span className="text-lg font-bold">AC</span>
                </div>
                <span className="text-lg font-semibold">{t('chatAssistant')}</span>
              </div>
              <button
                className="text-sm px-2 py-1 rounded bg-opacity-20 bg-white hover:bg-opacity-30 transition-colors"
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
              >
                {i18n.language === 'en' ? 'ES' : 'EN'}
              </button>
            </div>
          </div>
          <div className="flex-grow overflow-hidden p-4">
            <MemoizedScrollArea>
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${message.role === 'user'
                    ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                    : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800')
                    }`}>
                    {message.content}
                  </div>
                  {message.role === 'assistant' && (
                    <div className="flex mt-1 justify-start">
                      <button
                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                        onClick={() => rateMessage(index, 'helpful')}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                        onClick={() => rateMessage(index, 'not helpful')}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </MemoizedScrollArea>
          </div>
          {isTyping && (
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2 mb-2`}>
              {t('typing')}
            </div>
          )}
          <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full space-x-2">
              <input
                className={`flex-grow pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                  ? 'bg-gray-800 text-white border-gray-600'
                  : 'bg-white text-gray-800 border-gray-300'
                  }`}
                placeholder={t('typePlaceholder')}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                type="button"
                className={`p-1 rounded-md ${isDarkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-5 w-5" />
              </button>
            </form>
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0">
              <EmojiPicker onEmojiSelect={(emoji) => {
                setInputMessage(prev => prev + emoji.native)
                setShowEmojiPicker(false)
              }} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}