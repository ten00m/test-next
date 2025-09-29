import { FC, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const FileInput: FC<FileInputProps> = ({ label, className = '', ...props }) => {
    const id = uuid()

    return (
        <div className="relative flex flex-col pt-2.5">
            {label && (
                <label
                    className="absolute h-5 p-0.5 text-center text-5 text-sm font-medium text-text-secondary bg-background top-0 left-2.5"
                    id={id}
                >
                    {label}
                </label>
            )}
            <input
                type="file"
                className={`px-3 py-2 border-2 border-border rounded-lg focus:outline-none focus:border-primary ${className}`}
                id={id}
                {...props}
            />
        </div>
    )
}
