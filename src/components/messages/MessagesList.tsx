'use client'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'


interface MessageListProps {
    messages: Array<{
        role: 'user' | 'assistant'
        content: string
        rating?: 'helpful' | 'not helpful'
    }>
    isDarkMode: boolean
}

export const MessagesList: React.FC<MessageListProps> = React.memo(({ messages, isDarkMode }) => (
    <div className="flex-grow overflow-hidden p-4">
        <div className="h-full overflow-y-auto pr-4">
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
                                onClick={() => {/* Implement rating logic */ }}
                            >
                                <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button
                                className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                                onClick={() => {/* Implement rating logic */ }}
                            >
                                <ThumbsDown className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
))