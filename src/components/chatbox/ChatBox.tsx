'use client'
import React, { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { ChatHeader, ChatInput, MemoizedEmojiPicker as EmojiPicker, MemoizedMessagesList as MessagesList, TypingIndicator } from '@/components'
import { useChatStore } from '@/store'
import { Props } from '@/interface'
import Lottie from 'react-lottie-player'
import chat2 from "../../../public/img/lottie/lottieflow-chat22-dark.json";

export const ChatBox: React.FC<Props> = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const { messages, inputMessage, setInputMessage, isTyping, initializeChat } = useChatStore()


  useEffect(() => {
    if (isOpen) {
      initializeChat()
    }
  }, [isOpen, initializeChat])
  const lottieStyles = {
    width: 25,
    height: 25,
  };
  return (
    <div className="fixed bottom-4 right-4">
      <button
        className={`rounded-full w-12 h-12 shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'} flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {isOpen ? <X className="w-6 h-6" /> :
          // <MessageCircle className="w-6 h-6" />
          <Lottie
            loop={true}
            play={!isOpen}
            animationData={chat2}
            // onLoopComplete={handleEndAnimated}
            // onClick={scrollToTop}
            // segments={[1, 300]}
            style={lottieStyles}
            speed={1}
          />
        }
      </button>
      {isOpen && (
        <div
          className={`bg-imageBack_1 bg-cover absolute bottom-16 right-0 w-[350px] h-[500px] flex flex-col shadow-2xl 
            transition-all duration-300 ease-in-out animate-[slideIn_0.3s_ease-out] 
            ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg overflow-hidden`}
          role="dialog"
          aria-label={'chatAssistant'}
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