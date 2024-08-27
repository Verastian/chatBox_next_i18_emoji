'use server'
import { NextResponse } from 'next/server';
import { processMessage } from '../../../lib/nlp';

export async function POST(request: Request) {
    const { message } = await request.json();
    try {
        const response = processMessage(message);
        return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({ error: 'Error processing message' }, { status: 500 });
    }
}