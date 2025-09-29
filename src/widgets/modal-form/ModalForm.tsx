'use client'

import { useState } from 'react'
import Modal from '@/src/shared/ui/modal'
import Input from '@/src/shared/ui/input'
import FileInput from '@/src/shared/ui/fileInput'
import Button from '@/src/shared/ui/button'
import { ModalFormData } from '@/src/shared/lib/types/modal'
import { FC, ChangeEvent, FormEvent } from 'react'

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
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, file }))
    }

    const resetForm = () => {
        setFormData({
            title: '',
            file: null,
        })
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Создать новый пост">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Заголовок"
                    name="title"
                    type="text"
                    placeholder="Введите заголовок"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />

                <FileInput
                    label="Выберите файл"
                    name="file"
                    accept="image/*,.pdf,.doc,.docx"
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
