interface InputFieldProps {
    id: string
    required: boolean
    name?: string
    value?: string
    placeholder?: string
}

export default function InputField({ id, value, required, name, placeholder }: InputFieldProps): JSX.Element {
    const style = 'rounded border-solid border-gray-600 text-black'

    return (
        <div>
            <input
                id={id}
                value={value}
                required={required}
                name={name}
                placeholder={placeholder}
                className={style}
            ></input>
        </div>
    )
}
