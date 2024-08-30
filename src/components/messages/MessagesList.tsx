'use client'

import { MessageListProps } from '@/interface';
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React, { FC, memo } from 'react'
import { MessageContent } from './MessageContent';

const MessagesList: FC<MessageListProps> = ({ messages, isDarkMode }) => (
    <div className="flex-grow overflow-hidden p-4">
        <div className="h-full overflow-y-auto pr-4">
            {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded-lg ${message.role === 'user'
                        ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white')
                        : (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800')
                        }`}>
                        <MessageContent content={message.content} />
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
);

// Añadir displayName manualmente al componente memorizado
export const MemoizedMessagesList = memo(MessagesList);
MemoizedMessagesList.displayName = 'MessagesList';

export default MemoizedMessagesList;