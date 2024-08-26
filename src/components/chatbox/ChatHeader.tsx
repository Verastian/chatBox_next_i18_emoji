'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface ChatHeaderProps {
    isDarkMode: boolean
    toggleLanguage: () => void
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ isDarkMode, toggleLanguage }) => {
    const { t, i18n } = useTranslation()
    return (
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
                    onClick={toggleLanguage}
                >
                    {i18n.language === 'en' ? 'ES' : 'EN'}
                </button>
            </div>
        </div>
    )
}