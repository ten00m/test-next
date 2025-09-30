'use client'

import { useState } from 'react'

interface IUseModalFrom<T> {
    onSubmit: (data: T) => void
}

export const useModalForm = <TData>({onSubmit}: IUseModalFrom<TData>) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleSubmit = async (data: TData) => {
        setIsLoading(true)

        try {
            onSubmit(data);
            closeModal()
        } catch (error) {
            console.error('Ошибка при отправке формы:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isModalOpen,
        isLoading,
        openModal,
        closeModal,
        handleSubmit,
    }
}
