'use client'
import { Send, Smile } from 'lucide-react'
import React from 'react'

interface ChatInputProps {
    inputMessage: string
    setInputMessage: (message: string) => void
    handleSendMessage: () => void
    isDarkMode: boolean
    showEmojiPicker: boolean
    setShowEmojiPicker: (show: boolean) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isDarkMode,
    showEmojiPicker,
    setShowEmojiPicker
}) => {
    return (
        <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full space-x-2">
                <input
                    className={`flex-grow pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode
                        ? 'bg-gray-800 text-white border-gray-600'
                        : 'bg-white text-gray-800 border-gray-300'
                        }`}
                    placeholder={'typePlaceholder'}
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
    )
}