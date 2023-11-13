'use client'

import InputField from '@/app/common/components/InputField'
import AdjectiveInput from '@/app/common/components/AdjectiveInput'
import { CSSProperties, FormEvent, useState } from 'react'

const systemMessage = `
You are a professional writer.
You should create an adjective story based on the given prompt.
You should write at least one paragraph with all adjectives missing, relpaced with "_______".
Each noun should have an missing adjective 
You should just give the answer without any other comments.
You should not use any number indicators like (x) next to the missing adjectives.
`

const systemMessageAdjectives = `
You should fill in the missing adjectives denoted by "_______" using the provided adjective list.
You should return only the filled out story without any other comments.
You should fill the first word in the first missing adjective spot, the second word in the second spot, and so on.
You should not try to make the adjectives make sense.
You should not output the adjectives used.
`

type APIResult = { loading: true } | { loading: false; response: OpenAIResponse }

const inputId = 'input'

export default function Home() {
    const [result, setResult] = useState<APIResult>()
    const [adjectives, setAdjectives] = useState<string[]>([])
    const [filledResult, setFilledResult] = useState<APIResult>()
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [buttonDisable, setButtonDisable] = useState<boolean>(true)

    const buttonBlur: string = 'opacity-50'

    /**
     * Calls the OpenAI API with the user inputted prompt to create an adjective story.
     * Then sets the result so it can be displayed.
     * @param event
     */
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setResult({ loading: true })

        const inputElement = document.getElementById(inputId) as HTMLInputElement

        const request: OpenAIRequest = {
            model: 'gpt-4-1106-preview',
            prompt: inputElement.value,
            system: systemMessage,
        }

        const result = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (result.ok) {
            setResult({ loading: false, response: await result.json() })
            setButtonDisable(false)
        } else {
            setResult(undefined)
        }
    }

    /**
     * Calls the OpenAI API to fill in the missing adjectives using the user generated adjective list,
     * then sets the filledResult to the response from the API and clears the adjective list.
     * @param event
     */
    async function handleAdjectives(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setFilledResult({ loading: true })

        const request: OpenAIRequest = {
            model: 'gpt-4-1106-preview',
            prompt: `
                Replace **all** the missing adjectives with the given words [${adjectives.toString()}].
                Mark the adjectives in bold.
                Previous respone: ${(result as any)?.response?.content}`,
            system: systemMessageAdjectives,
        }

        const resultFilled = await fetch('api', {
            body: JSON.stringify(request),
            method: 'POST',
        })
        if (resultFilled.ok) {
            setFilledResult({ loading: false, response: await resultFilled.json() })
            setAdjectives([])
            setButtonDisable(true)
        } else {
            setFilledResult(undefined)
        }
    }

    /**
     * Replaces MD bold text **word** with HTML bold text <strong>word</strong>
     * @param text Markdown formatted text to be changed to HTML.
     */
    function formatAdjectives(text: string | undefined) {
        if (text === undefined) return
        return { __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }
    }

    return (
        <main className='flex flex-col items-center justify-between sm:p-24 p-5'>
            <h1>Adjective Story</h1>
            <AdjectiveInput adjectives={adjectives} setAdjectives={setAdjectives} />
            <form onSubmit={handleSubmit}>
                <InputField id={inputId} required placeholder='Enter aleast 1 keyword' />
                <button type={'submit'}>Generate</button>
            </form>
            <button type='button' onClick={() => setIsHidden(!isHidden)}>
                {isHidden ? 'Show generated text' : 'Hide generated text'}
            </button>
            {!isHidden ? result?.loading ? <p>Loading...</p> : <p>{result?.response?.content}</p> : null}
            {result?.loading ? <p>Loading...</p> : <p>Fill in adjectives</p>}
            <form onSubmit={handleAdjectives}>
                <button type={'submit'} disabled={buttonDisable} className={buttonDisable == true ? buttonBlur : ''}>
                    Fill in
                </button>
            </form>
            {filledResult?.loading ? (
                <p>Please wait, filling story...</p>
            ) : (
                <p dangerouslySetInnerHTML={formatAdjectives(filledResult?.response?.content)}></p>
            )}
        </main>
    )
}
