'use client'
import React from 'react'

interface TypingIndicatorProps {
    isDarkMode: boolean
}
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
    return (
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2 mb-2`}>
            {'typing'}
        </div>
    )
}
