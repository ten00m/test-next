'use client'

import { useEffect, FC, ReactNode } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-background opacity-50" onClick={onClose} />
            <div className="relative bg-background filter contrast-80 rounded-lg shadow-xl w-full max-w-md mx-4">
                {title && (
                    <div className="px-6 py-4 border-b border-border">
                        <h2 className="text-xl font-semibold text-text">{title}</h2>
                    </div>
                )}
                <div className="px-6 py-4">{children}</div>
            </div>
        </div>
    )
}
