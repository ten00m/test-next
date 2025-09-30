'use client'

import { useState } from 'react'
import Modal from '@/src/shared/ui/modal'
import Input from '@/src/shared/ui/input'
import FileInput from '@/src/shared/ui/fileInput'
import Button from '@/src/shared/ui/button'
import { ModalFormData } from '@/src/shared/lib/types/modal'
import { FC, ChangeEvent, FormEvent } from 'react'
import Textarea from "@/src/shared/ui/textarea";

interface ModalFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ModalFormData) => void
    loading?: boolean
}

export const ModalForm: FC<ModalFormProps> = ({ isOpen, onClose, onSubmit, loading = false }) => {
    const [formData, setFormData] = useState<ModalFormData>({
        title: '',
        file: null,
        info: ''
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const info = e.target.value;
        setFormData(prev => {
            return {
                ...prev,
                info: info
            }
        })
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        if (file && file.type.startsWith('image/')) {
            setFormData((prev) => ({ ...prev, file }))
        }
    }

    const resetForm = () => {
        setFormData({
            title: '',
            file: null,
            info: ''
        })
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Изменить данные пользователя">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Имя"
                    name="title"
                    type="text"
                    placeholder="Введите никнейм"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    label="Обо мне"
                    name="info"
                    placeholder="Расскажите о себе"
                    value={formData.info}
                    onChange={handleTextareaChange}
                />
                <FileInput
                    label="Аватар"
                    name="file"
                    accept="image/"
                    onChange={handleFileChange}
                />

                {formData.file && (
                    <div className="text-sm text-gray-600">Выбран файл: {formData.file.name}</div>
                )}

                <div className="flex gap-3 justify-end pt-4">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Отмена
                    </Button>
                    <Button type="submit" loading={loading} disabled={!formData.title.trim()}>
                        Создать
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
