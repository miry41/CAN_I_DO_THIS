import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  return NextResponse.json({
    apiKeyExists: !!apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE',
    apiKeyLength: apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' ? apiKey.length : 0,
    message: apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE' ? 'API key is configured' : 'API key is not configured'
  });
} 