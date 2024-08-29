'use client'
import { ChatHeaderProps } from '@/interface'
import React from 'react'

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isDarkMode, toggleLanguage }) => {
    return (
        <div className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-white text-blue-500'} flex items-center justify-center`}>
                        <span className="text-lg font-bold">AC</span>
                    </div>
                    <span className="text-lg font-semibold">{'chatAssistant'}</span>
                </div>
            </div>
        </div>
    )
}