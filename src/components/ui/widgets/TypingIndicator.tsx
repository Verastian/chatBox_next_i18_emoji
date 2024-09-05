'use client'
import { TypingIndicatorProps } from '@/interface'
import dynamic from 'next/dynamic';
import typingDark from "../../../../public/img/lottie/lottieflow-loading-dark.json";
import typingLight from "../../../../public/img/lottie/lottieflow-loading-light.json";
import React from 'react'
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {

    const lottieStyles = {
        width: 30,
        height: 30,
    };

    return (
        <div className={`text-sm flex 
        ${isDarkMode ? 'text-gray-400' : 'text-gray-800 font-medium'} ml-2 mb-2`}>
            {'typing'}
            <Lottie
                loop={true}
                play={true}
                animationData={isDarkMode ? typingDark : typingLight}
                style={lottieStyles}
            />
        </div>
    )
}
