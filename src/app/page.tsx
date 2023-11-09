'use client'

import { type FormEvent, useState } from 'react'

const systemMessage = `
You are tasked with crafting a unique story that creatively omits adjectives where indicated. Here are your guidelines:

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

Note that these input specifications are for your reference only and should not be referenced in the output.
    If any are omitted, the defaults will be used.
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
            model: 'gpt-4-1106-preview',
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
            model: 'gpt-4-1106-preview',
            prompt: `Replace **all** the missing adjectives with the given words: [wobbly, jiggly, delicious, sweaty, fluffy, cheesy]. Mark the adjectives in bold.
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
