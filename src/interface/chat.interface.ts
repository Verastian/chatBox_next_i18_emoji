export interface Props {
    isDarkMode: boolean
}

//tipo literal 
export type MessageRating = 'helpful' | 'not helpful';


export interface Message {
    role: 'user' | 'assistant';
    content: string;
    rating?: MessageRating;
}

export interface MessageListProps {
    messages: Message[];
    isDarkMode: boolean;
}

export interface TypingIndicatorProps {
    isDarkMode: boolean
}

export interface ChatInputProps {
    isDarkMode: boolean
    showEmojiPicker: boolean
    setShowEmojiPicker: (show: boolean) => void
}

export interface ChatHeaderProps {
    isDarkMode: boolean
    toggleLanguage?: () => void
}


