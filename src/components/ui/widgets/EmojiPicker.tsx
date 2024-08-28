import React, { FC, memo } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
    onEmojiSelect: (emoji: any) => void
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onEmojiSelect }) => (
    <Picker data={data} onEmojiSelect={onEmojiSelect} />
)

export const MemoizedEmojiPicker = memo(EmojiPicker);
MemoizedEmojiPicker.displayName = 'EmojiPicker';

export default MemoizedEmojiPicker;

