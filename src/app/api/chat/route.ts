import { NextResponse } from 'next/server';
import { processMessage } from '../../../lib/nlp';

export async function POST(request: Request) {
    console.log('API called');
    const { message } = await request.json();
    console.log('Received message:', message);
    try {
        const response = processMessage(message);
        console.log('Processed response:', response);
        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error processing message:', error);
        return NextResponse.json({ error: 'Error processing message' }, { status: 500 });
    }
}