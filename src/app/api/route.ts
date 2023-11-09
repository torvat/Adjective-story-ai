import { NextRequest } from 'next/server'
import OpenAI from 'openai/index'

const openai = new OpenAI()

/**
 * The function recieves a Post request and performs a request to the OpenAI API
 * The first message of the OpenAI API response will always be returned as the response
 * The request should contain a JSON body with the following structure:
 * {
 *  system: string,
 *  prompt: string,
 *  model?: GPTModel
 * }
 * The model is optional and defaults to gpt-3.5-turbo
 * @param request The request object
 * @returns The response object containing the first message of the OpenAI API response
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
