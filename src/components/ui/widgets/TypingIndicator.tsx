'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface TypingIndicatorProps {
    isDarkMode: boolean
}
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
    const { t } = useTranslation()
    return (
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2 mb-2`}>
            {t('typing')}
        </div>
    )
}
