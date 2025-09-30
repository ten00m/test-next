import Link from 'next/link'
import { getPosts } from '@/src/entities/post/api/api'

export async function Home() {
    const { posts, error } = await getPosts()
    const latestPosts = posts?.slice(0, 3)

    const pages = [
        {
            href: '/',
            title: 'SSG = Главная',
            description: 'Статическая главная страница',
            features: [
                'Данные загружаются при сборке',
                'Мгновенная загрузка',
                'Идеально для неизменных данных',
            ],
        },
        {
            href: '/posts',
            title: ' SSR - Посты',
            description: 'Серверный рендеринг',
            features: [
                'Данные обновляются при каждом запросе',
                'Реальные комментарии с API',
                'Интерактивные действия',
            ],
        },
        {
            href: '/isr-page',
            title: 'ISR - Альбомы',
            description: 'Инкрементальная статическая регенерация с фотографиями',
            features: [
                'Автообновление каждые 60 секунд',
                'Альбомы с фотографиями',
                'Оптимальное кэширование',
            ],
        },
        {
            href: '/profile',
            title: 'CSR - Профиль',
            description: 'Клиентский рендеринг',
            features: [
                'Динамические взаимодействия',
                'Создание постов в реальном времени',
                'Без перезагрузки страницы',
            ],
        },
    ]

    return (
        <div className="min-h-screen bg-element-background rounded-lg">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-text mb-6">Тестовое задание next js</h1>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {pages.map((page) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="block bg-element-background filter contrast-75 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-text">{page.title}</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {page.title.split(' - ')[0]}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-6">{page.description}</p>
                                <ul className="space-y-2">
                                    {page.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center text-sm text-gray-500"
                                        >
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const dynamic = 'force-static'
