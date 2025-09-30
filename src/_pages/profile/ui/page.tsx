'use client';

import { useState, useEffect } from 'react';
import {createPost, getPosts} from "@/src/entities/post/api/api";
import type {Post} from '@/src/entities/post/types/types'
import Button from '@/src/shared/ui/button'
import Input from '@/src/shared/ui/input'
import Textarea from "@/src/shared/ui/textarea";
import {useModalForm} from "@/src/features/modal-from";
import ModalForm from "@/src/widgets/modal-form";



export function Profile() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'userId'>>({ title: '', body: '' });

    const { isModalOpen, isLoading, openModal, closeModal, handleSubmit } = useModalForm();

    const fetchPosts = () => {
        getPosts()
            .then(({posts}) => {
                setLoading(true);
                setPosts(posts.slice(0, 5)); //грузим 5 для демонстрации
            })
            .catch( err => {
                console.log('Ошибка при загрузке постов', err)
            })
            .finally(() => setLoading(false));
    }

    const createPostHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.title.trim() || !newPost.body.trim()) return;

        createPost({
            title: newPost.title,
            body: newPost.body,
            userId: 1
        })
            .then(({post}) => {
                setCreating(true);
                if(post !== undefined){
                    setPosts([post, ...posts]);
                }
                setNewPost({ title: '', body: '' });
                alert('Пост успешно создан');
            })
            .catch (err => {
                console.log('Ошибка во время создания поста', err)
            })
            .finally(() => setCreating(false));
    }

    const onInputChangeHandler = (value: string, property: keyof Post) => {
        setNewPost(prev => {
            return {
                ...prev,
                [property]: value
            }
        })
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-text-secondary mb-4 animate-pulse">Загрузка...</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-text mb-4">
                            CSR Страница - Профиль ползователя
                        </h1>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button onClick={fetchPosts} variant="secondary">
                                Обновить посты
                            </Button>
                            <Button onClick={openModal}>
                                Открыть модалку
                            </Button>
                        </div>
                    </div>

                    <div className="bg-element-background rounded-2xl shadow-xl p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text mb-6">Создать новый пост</h2>
                        <form onSubmit={createPostHandler} className="space-y-4">
                            <Input
                                label="Заголовок поста"
                                labelClass="bg-element-background"
                                placeholder="Введите заголовок..."
                                value={newPost.title}
                                onChange={e => onInputChangeHandler(e.target.value, 'title')}
                                required
                            />
                            <Textarea
                                value={newPost.body}
                                label="Текст поста"
                                labelClass="bg-element-background"
                                onChange={e => onInputChangeHandler(e.target.value, 'body')}
                                required
                            />
                            <Button
                                type="submit"
                                loading={creating}
                                disabled={!newPost.title.trim() || !newPost.body.trim()}
                                className="w-full"
                            >
                                Создать пост
                            </Button>
                        </form>
                    </div>

                    <div className="bg-element-background rounded-2xl shadow-xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-text">Последние посты</h2>
                            <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {posts.length} постов
              </span>
                        </div>

                        <div className="space-y-6">
                            {posts.map((post) => (
                                <div key={post.id} className="border-l-4 border-primary pl-4 py-3">
                                    <h3 className="font-bold text-text text-lg mb-2">{post.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{post.body}</p>
                                    <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-400">
                      Пользователь #{post.userId}
                    </span>
                                        <span className="text-sm text-gray-500">
                      ID: {post.id}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ModalForm
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                loading={isLoading}
            />
        </div>
    );
}