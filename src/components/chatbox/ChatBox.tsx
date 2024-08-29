'use client'
import React, { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { ChatHeader, ChatInput, MemoizedEmojiPicker as EmojiPicker, MemoizedMessagesList as MessagesList, TypingIndicator } from '@/components'
import { useChatStore } from '@/store'
import { Props } from '@/interface'

export const ChatBox: React.FC<Props> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { messages, inputMessage, setInputMessage, isTyping, handleSendMessage, initializeChat } = useChatStore()


  useEffect(() => {
    if (isOpen) {
      initializeChat()
    }
  }, [isOpen, initializeChat])

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
          aria-label={'chatAssistant'}
          style={{
            backgroundImage: isDarkMode ? 'none' : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        >
          <ChatHeader isDarkMode={isDarkMode} />
          <MessagesList messages={messages} isDarkMode={isDarkMode} />
          {isTyping && <TypingIndicator isDarkMode={isDarkMode} />}
          <ChatInput
            isDarkMode={isDarkMode}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
          />
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-0">
              <EmojiPicker
                onEmojiSelect={(emoji) => {
                  setInputMessage(inputMessage + emoji.native)
                  setShowEmojiPicker(false)
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}