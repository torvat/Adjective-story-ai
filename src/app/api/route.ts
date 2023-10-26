import { NextRequest } from 'next/server'
import OpenAI from 'openai/index'

const openai = new OpenAI()

/**
 * @example fetch('api', { method: 'post', body: JSON.stringify({system: "message", prompt: "prompt", model: "gpt-3.5-turbo"}) });
 */
export async function POST(request: NextRequest): Promise<Response> {
    const data: OpenAIRequest = await request.json()
    const transcription = await openai.chat.completions.create({
        model: data.model ?? 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: data.system },
            { role: 'user', content: data.prompt },
        ],
    })
    return Response.json(transcription.choices[0].message)
}
