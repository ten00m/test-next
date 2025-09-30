import { FC, InputHTMLAttributes } from 'react'
import { v4 as uuid } from 'uuid'

interface TextareaProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    labelClass?: string,
}

export const Textarea: FC<TextareaProps> = ({ label, className = '', labelClass = 'bg-background', ...props }) => {
    const id = uuid()
    return (
        <div className="flex flex-col gap-1 relative pt-2.5">
            {label && (
                <label
                    className={`absolute h-5 px-0.5 text-center text-5 text-sm font-medium text-text-secondary top-0 left-2.5 ${labelClass}`}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className="px-3 py-2 border-2 border-border rounded-lg focus:border-primary min-h-[100px] resize-vertical"
                {...props}
            ></textarea>
        </div>
    )
}
