import React, { FC, memo } from 'react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
    onEmojiSelect: (emoji: any) => void
}

export const EmojiPicker: FC<EmojiPickerProps> = memo(({ onEmojiSelect }) => (
    <Picker data={data} onEmojiSelect={onEmojiSelect} />
))


