import { initializeNLP } from '@/lib/nlp'
import { NextResponse } from 'next/server'


export function middleware(req: Request) {
    console.log('Middleware executed')
    initializeNLP()
    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*',
}