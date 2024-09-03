import React, { FC, memo } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
    onEmojiSelect: (emoji: any) => void
}

// console.log('EMOJIS: ', data)
const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiSelect }) => (
    <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        categories={['people']}
        locale={'es'}
    />
)

export const MemoizedEmojiPicker = memo(EmojiPicker);
MemoizedEmojiPicker.displayName = 'EmojiPicker';

export default MemoizedEmojiPicker;

