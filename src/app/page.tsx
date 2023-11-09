'use client'

import InputField from '@/app/common/components/InputField'
import AdjectiveInput from '@/app/common/components/AdjectiveInput'
import { type FormEvent, useState } from 'react'

const systemMessagePrompt = `
You should create an Adjective Story based on the provided theme:

    Imagine yourself as a skilled writer with the vivid imagination of an 8-year-old in the 3rd grade.
    Your story should align with the provided theme and exclude adjectives in certain parts.
    Instead of using adjectives, leave a blank "_______" to signify their absence.
    Provide a narrative that flows naturally despite the omitted words.
    Present your story directly, without additional commentary or explanation.
    Refrain from marking omitted adjectives with any numbers or symbols.

You should respond in the language of the prompt.

Your input should follow the template:

theme:{}
length:{}
words:{}
Where
    theme is the theme of the text.
    length is the approximate length of the text.
    words should be the number if adjectives that should be missing from the text.

The theme, length and words should not be referenced in the response.
`

const systemMessageAdjectives = `
You are lazy and predictable.
You should fill in the missing adjectives denoted by "_______" using the provided adjective list.
You should return only the filled out story without any other comments.
The words should be added to the text in the same order as they are in the list.
You should NOT include any another adjectives than the provided in the story.
`
type Loading = { loading: true }
type Response = { loading: false; response: OpenAIResponse }

type APIResult = Loading | Response

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<APIResult>()
    const [adjectives, setAdjectives] = useState<string[]>([])
    const [filledResult, setFilledResult] = useState<APIResult>()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResult({ loading: true })
        setFilledResult(undefined)

        const inputElement = document.getElementById(inputId) as HTMLInputElement

        const request: OpenAIRequest = {
            model: 'gpt-4-1106-preview',
            prompt: inputElement.value,
            system: systemMessagePrompt,
        }

        const result = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (result.ok) {
            setResult({ loading: false, response: await result.json() })
        } else {
            setResult(undefined)
        }
    }

    async function handleAdjectives(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFilledResult({ loading: true })

        const request: OpenAIRequest = {
            model: 'gpt-4-1106-preview',
            prompt: `
            Replace **all** the missing adjectives with the given words [${adjectives.join(', ')}]
            Mark the adjectives in bold.
            Previous respone: ${(result as Response)?.response?.content}`,
            system: systemMessageAdjectives,
        }

        const resultFilled = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (resultFilled.ok) {
            setFilledResult({ loading: false, response: await resultFilled.json() })
            setAdjectives([])
        } else {
            setFilledResult(undefined)
        }
    }

    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <h1>Adjective Story</h1>
            <form onSubmit={handleSubmit}>
                <InputField id={inputId} required />
                <button type={'submit'}>Generate</button>
            </form>
            {result?.loading ? <p>Please wait</p> : <p>{result?.response?.content}</p>}
            <AdjectiveInput adjectives={adjectives} setAdjectives={setAdjectives} />
            <form onSubmit={handleAdjectives}>
                <button type={'submit'}>Fill in</button>
            </form>
            {filledResult?.loading ? <p>Please wait, filling story...</p> : <p>{filledResult?.response?.content}</p>}
        </main>
    )
}
