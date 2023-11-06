'use client'

import InputField from '@/app/common/components/InputField'
import { FormEvent, useState } from 'react'
import AdjectiveInput from "@/app/common/components/AdjectiveInput";

const systemMessage = `
You are a professional writer.
You should create an adjective story based on the given prompt.
You should write at least one paragraph with adjectives missing in several sentences.
Where there are missing adjectives, it should be denoted only using "_______".
You should just give the answer without any other comments.
You should not use any number indicators like (x) next to the missing adjectives.
`

type APIResult = { loading: true } | { loading: false; response: OpenAIResponse }

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<APIResult>()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResult({ loading: true })

        const inputElement = document.getElementById(inputId) as HTMLInputElement

        const request: OpenAIRequest = {
            model: 'gpt-3.5-turbo',
            prompt: inputElement.value,
            system: systemMessage,
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

    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <h1>Adjective Story</h1>
            <form onSubmit={handleSubmit}>
                <InputField id={inputId} required />
                <button type={'submit'}>Generate</button>
            </form>
            {result?.loading ? <p>Please wait</p> : <p>{result?.response?.content}</p>}
            <AdjectiveInput></AdjectiveInput>
        </main>
    )
}
