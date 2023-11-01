'use client'
import Image from 'next/image'
import InputField from './common/components/InputField'
import Button from './common/components/Button'
import { useState } from 'react'

export default function App() {
    const [output, setOutput] = useState<string | null | undefined>('')

    const style = 'flex items-center h-screen justify-center'
    const outputStyle = 'flex-none mt-10'

    function displayOut() {
        // Change this should propably use event.target.value
        const output = document.getElementById('create') as HTMLInputElement
        setOutput(output.value)
    }

    return (
        <div className={style}>
            <div>
                <div>
                    <InputField id='create' required={true} placeholder='Enter Query' />
                    <InputField id='length' required={false} placeholder='Enter Story Lenght' type='number' />
                    <Button id='button-create' content='Create' onClick={() => displayOut()} />
                </div>
                <div className={outputStyle}>
                    {/*this component is not created yet*/}
                    <a>Output: {output}</a>
                    <InputField id='input' required={true} placeholder='Enter Adjectives' />
                </div>
            </div>
        </div>
    )
}
