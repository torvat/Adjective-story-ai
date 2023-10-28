type GPTModel = 'gpt-4' | 'gpt-3.5-turbo'

interface OpenAIRequest {
    system: string
    prompt: string
    model?: GPTModel
}

interface OpenAIResponse {
    role: 'system' | 'user' | 'assistant'
    content: string
}
