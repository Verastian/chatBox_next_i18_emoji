'use client'
import React, { FC } from 'react'
import { MessageCircle, X, Send, Sun, Moon } from 'lucide-react'

interface Props {
 isDarkMode: boolean;
 toggleTheme: () => void;
}


export const ThemeSelector: FC<Props> = ({ isDarkMode = false, toggleTheme }) => {
 return (
  <button
   onClick={toggleTheme}
   className={`fixed top-4 right-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-blue-500 text-white'
    }`}
   aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  >
   {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
  </button>
 )
}
