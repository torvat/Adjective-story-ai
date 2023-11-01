'use client0'
import React from 'react'

interface ButtonProps {
    content: string
    id: string
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({ content, id, onClick }: ButtonProps) {
    const style = 'outline outline-2 outline-cyan-500 bg-stone-400 rounded my-2 p-1'

    return (
        <div>
            <button id={id} onClick={onClick} className={style}>
                {content}
            </button>
        </div>
    )
}
