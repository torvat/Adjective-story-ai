'use client'

import InputField from '@/app/common/components/InputField'
import AdjectiveInput from "@/app/common/components/AdjectiveInput";
import { FormEvent, useState } from 'react'

const systemMessage = `
You are a professional writer.
You should create an adjective story based on the given prompt.
You should write at least one paragraph with adjectives missing in several sentences.
Where there are missing adjectives, it should be denoted only using "_______".
You should just give the answer without any other comments.
You should not use any number indicators like (x) next to the missing adjectives.
`

const systemMessageAdjectives = `
You should fill in the missing adjectives denoted by "_______" using the provided adjective list.
You should return only the filled out story without any other comments.
You should fill the first word in the first missing adjective spot, the second word in the second spot, and so on.
You should not try to make the adjectives make sense.
`

type APIResult = { loading: true } | { loading: false; response: OpenAIResponse }

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<APIResult>()
    const [adjectives, setAdjectives] = useState<string[]>([]);
    const [filledResult, setFilledResult] = useState<APIResult>()

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
    async function handleAdjectives(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFilledResult({loading: true})

        const request: OpenAIRequest = {
            model: 'gpt-3.5-turbo',
            prompt: 'Replace **all** the missing adjectives with the given words ' + adjectives.toString() + 'Mark the adjectives in bold. Previous respone: ' + (result as any)?.response?.content,
            system: systemMessageAdjectives,
        }

        const resultFilled = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (resultFilled.ok) {
            setFilledResult({loading: false, response: await resultFilled.json()})
            setAdjectives([])
        } else {
            setFilledResult(undefined)
        }
    }

    function formatAdjectives(text: string){
        return { __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') };
    }

    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <h1>Adjective Story</h1>
            <form onSubmit={handleSubmit}>
                <InputField id={inputId} required />
                <button type={'submit'}>Generate</button>
            </form>
            {result?.loading ? <p>Please wait</p> : <p>{result?.response?.content}</p>}
            <AdjectiveInput adjectives={adjectives} setAdjectives={setAdjectives}/>
            <form onSubmit={handleAdjectives}>
                <button type={'submit'}>Fill in</button>
            </form>
            {filledResult?.loading ? <p>Please wait, filling story...</p> : <p dangerouslySetInnerHTML={formatAdjectives(filledResult!.response!.content)}></p>
            }

        </main>
    )
}
