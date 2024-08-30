import React from 'react';
import Image from 'next/image';
import { Waves, Phone, Link } from 'lucide-react';
import { ContentItem } from '@/interface';

interface MessageContentProps {
    content: ContentItem | ContentItem[];
}

export const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
    const renderContent = (item: ContentItem) => {
        switch (item.type) {
            case 'text':
                return <p>{item.content}</p>;
            case 'icon':
                return item.content === 'wave' ? <Waves className="w-6 h-6" /> : null;
            case 'link':
                return <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"><Link className="w-4 h-4 inline mr-1" />{item.content}</a>;
            case 'phone':
                return <a href={`tel:${item.content}`} className="text-blue-500 hover:underline"><Phone className="w-4 h-4 inline mr-1" />{item.content}</a>;
            case 'whatsapp':
                return <a href={`https://wa.me/${item.number}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline"><i className="fab fa-whatsapp mr-1"></i>{item.content}</a>;
            case 'image':
                return <Image src={`/img/${item.content}`} alt={item.alt || ''} width={200} height={150} />;
            default:
                return <p>{item.content}</p>;
        }
    };

    return (
        <div className="space-y-2">
            {Array.isArray(content)
                ? content.map((item, index) => <div key={index}>{renderContent(item)}</div>)
                : renderContent(content)}
        </div>
    );
};