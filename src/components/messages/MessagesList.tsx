'use client'

import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { MessageListProps, Message, Rating } from '@/interface'
import { MessageContent } from './MessageContent'
import { useChatStore } from '@/store'



const MessagesList: FC<MessageListProps> = ({ messages, isDarkMode }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)
    // const [ratings, setRatings] = useState<Rating[]>([])
    const { ratings, handleRating } = useChatStore()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])
    return (
        <div className="flex-grow overflow-hidden p-4">
            <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
                {messages.map((message: Message, index) => {
                    return (
                        <div
                            key={message.id ?? index}
                            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'
                                }`}
                        >
                            <div
                                className={`inline-block p-2 rounded-lg ${message.role === 'user'
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-blue-500 text-white'
                                    : isDarkMode
                                        ? 'bg-gray-700 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <MessageContent content={message.content} />
                            </div>
                            {message.role === 'assistant' && (
                                <div className="flex mt-1 justify-start">
                                    <button
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                            }`}
                                        onClick={() => handleRating(message?.id ?? '0', 'helpful')}
                                    >
                                        <ThumbsUp
                                            className={`h-4 w-4 ${ratings.some(
                                                (r) => r.messageId === message.id && r.value === 'helpful'
                                            )
                                                ? 'text-green-500'
                                                : ''
                                                }`}
                                        />
                                    </button>
                                    <button
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                            }`}
                                        onClick={() => handleRating(message?.id ?? '0', 'not helpful')}
                                    >
                                        <ThumbsDown
                                            className={`h-4 w-4 ${ratings.some(
                                                (r) => r.messageId === message.id && r.value === 'not helpful'
                                            )
                                                ? 'text-red-500'
                                                : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}
// Añadir displayName manualmente al componente memorizado
export const MemoizedMessagesList = memo(MessagesList);
MemoizedMessagesList.displayName = 'MessagesList';

export default MemoizedMessagesList;