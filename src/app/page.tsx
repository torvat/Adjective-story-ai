'use client'

import InputField from '@/app/common/components/InputField'
import { FormEvent, useState } from 'react'

const systemMessage = `
You are a professional writer.
You should create an adjective history based on the given prompt.
You should write at least one paragraph with adjectives missing in several sentences.
Where there are missing adjectives, it should be denoted only using "_".
You should just give the answer without any other comments.
When creating an adjective history, you should not use any number indicators like (x) next to the missing adjectives.
`

type Result = { loading: true } | { loading: false; result: OpenAIResponse }

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<Result>()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResult({ loading: true })

        const inputElement = document.getElementById(inputId) as HTMLInputElement

        const request: OpenAIRequest = {
            model: 'gpt-4',
            prompt: inputElement.value,
            system: systemMessage,
        }

        const result = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (result.ok) {
            setResult({ loading: false, result: await result.json() })
        } else {
            setResult(undefined)
        }
    }

    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <h1>Adjective Story</h1>
            <form onSubmit={handleSubmit}>
                <InputField id={inputId} required />
                <button type={'submit'}>Generate</button>
            </form>
            {result?.loading ? <p>Please wait</p> : <p>{result?.result.content}</p>}
        </main>
    )
}
