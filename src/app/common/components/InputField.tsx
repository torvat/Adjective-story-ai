interface InputFieldProps {
    id: string
    required: boolean
    name?: string
    value?: string
    placeholder?: string
    type?: string
}

export default function InputField({ id, value, required, name, placeholder, type }: InputFieldProps): JSX.Element {
    const style = 'rounded border-solid border-2 border-teal-200 text-black my-2'

    return (
        <div>
            <input
                id={id}
                value={value}
                required={required}
                name={name}
                placeholder={placeholder}
                type={type}
                className={style}
            ></input>
        </div>
    )
}
