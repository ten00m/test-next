import { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    loading?: boolean
}

export const Button: FC<ButtonProps> = ({
    children,
    variant = 'primary',
    loading = false,
    className = '',
    ...props
}) => {
    const baseStyles =
        'px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 hover:filter hover:blur-1 hover:contrast-80 cursor-pointer duration-150'
    const variants = {
        primary: 'bg-primary text-text active:blur-20 active:contrast-60',
        secondary:
            'bg-secondary text-text-secondary border-text border-2 active:blur-20 active:contrast-10',
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading ? 'Loading...' : children}
        </button>
    )
}
