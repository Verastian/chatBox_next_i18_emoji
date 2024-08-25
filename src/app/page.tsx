'use client'
import { ChatBox, ThemeSelector } from "@/components";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }
  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8 text-gray-400">Welcome to Our Chat Application</h1>
        <ThemeSelector isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <ChatBox isDarkMode={isDarkMode} />
      </div>
    </main>
  );
}
