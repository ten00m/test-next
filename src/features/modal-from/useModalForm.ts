'use client'

import { useState } from 'react'
import { ModalFormData } from '@/shared/lib/types/modal'

export const useModalForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleSubmit = async (data: ModalFormData) => {
        setIsLoading(true)

        try {
            // Здесь будет логика отправки данных
            console.log('Отправка данных формы:', data)

            // Имитация задержки API
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log('Форма успешно отправлена!')
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
