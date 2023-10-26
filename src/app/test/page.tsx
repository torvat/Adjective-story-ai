'use client'

import { useEffect, useRef } from 'react'

const systemMessage = `
You are a professional writer.
You should create an adjective history based on the given prompt.
You should write at least one paragraph with adjectives missing in several sentences.
Where there are missing adjectives, it should be denoted only using "_".
You should just give the answer without any other comments.
When creating an adjective history, you should not use any number indicators like (x) next to the missing adjectives.
`
export default function test() {
    const hasCalled = useRef(false)

    useEffect(() => {
        const request: OpenAIRequest = {
            system: systemMessage,
            prompt: 'Tell me a story all about how my life got twisted turned upside down.',
            model: 'gpt-3.5-turbo',
        }

        // Bare sikrer at den kjører en gang i dev mode
        if (!hasCalled.current) {
            fetch('api', {
                method: 'post',
                body: JSON.stringify(request),
            }).then((res) => console.log(res.json()))
        }
        hasCalled.current = true
    }, [])

    return <p>Hello</p>
}
