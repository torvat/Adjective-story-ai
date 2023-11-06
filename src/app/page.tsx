'use client'

import { FormEvent, useState } from 'react'

const systemMessage = `
You are a professional writer.
You should create an adjective story based on the given prompt.
The text itself should not contain any adjectives.
You should write at least one paragraph with adjectives missing in several sentences.
Where there are missing adjectives, it should be denoted only using "_______".
You should just give the answer without any other comments.
You should not use any number indicators like (x) next to the missing adjectives.
The input will be on the form """
theme:{}
length:{}
words:{}""".
Where
    theme is the theme of the text.
    length is the approximate length of the text.
    words should be the number if adjectives that should be missing from the text.
The length and words should not be in the output.
`
type Loading = { loading: true }
type Finished = { loading: false; response: OpenAIResponse }
type APIResult = Loading | Finished

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<APIResult>()
    const [filledInText, setFilledInText] = useState<APIResult>()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResult({ loading: true })
        setFilledInText(undefined)

        const inputElement = document.getElementById(inputId) as HTMLInputElement

        const request: OpenAIRequest = {
            model: 'gpt-4',
            prompt: `theme: ${inputElement.value}`,
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

    async function addAdjectives() {
        if (result?.loading === true) return

        setFilledInText({ loading: true })

        // TODO legg inn adjektiv
        const request: OpenAIRequest = {
            model: 'gpt-4',
            prompt: `Replace **all** the missing adjectives with the given words: [big, delicious, sweaty]. Mark the adjectives in bold.
            Previous response: ${(result as Finished)?.response?.content}`,
            system: systemMessage,
        }

        const response = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (response.ok) {
            setFilledInText({ loading: false, response: await response.json() })
        } else {
            setFilledInText(undefined)
        }
    }

    // Bless this mess
    return (
        <main className='flex flex-col items-center justify-between p-24'>
            <h1>Adjective Story</h1>
            <form onSubmit={handleSubmit} className={'flex flex-col'}>
                <textarea id={inputId} className={'w-80'} required />
                <button type={'submit'}>Generate</button>
            </form>
            {result && (
                <>
                    {result?.loading ? (
                        <p>Please wait</p>
                    ) : (
                        <>
                            <p>{result?.response?.content}</p>
                            <button onClick={addAdjectives}>Fill in</button>
                            {filledInText && (
                                <>
                                    {filledInText?.loading ? (
                                        <>Please wait</>
                                    ) : (
                                        <p>{filledInText?.response?.content}</p>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </main>
    )
}
