export interface Props {
    isDarkMode: boolean
}

//tipo literal 
export type MessageRating = 'helpful' | 'not helpful';

export interface ContentItem {
    type?: string;
    content: string;
    url?: string;
    number?: string;
    alt?: string;
}

export interface Message {
    role?: 'user' | 'assistant';
    content: ContentItem | ContentItem[];
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


