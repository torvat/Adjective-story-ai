import OpenAI from 'openai'

const openai = new OpenAI()

export async function testQuery() {
    const transcription = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Tell me a programmer joke.' }],
    })
    return transcription.choices[0]
}
