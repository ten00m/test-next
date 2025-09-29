import { FC, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Input: FC<InputProps> = ({ label, className = '', ...props }) => {
    const id = uuid()
    return (
        <div className="flex flex-col gap-1 relative pt-2.5">
            {label && (
                <label
                    className="absolute h-5 px-0.5 text-center text-5 text-sm font-medium text-text-secondary bg-background top-0 left-2.5"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                className={`px-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary ${className}`}
                {...props}
                id={id}
            />
        </div>
    )
}
