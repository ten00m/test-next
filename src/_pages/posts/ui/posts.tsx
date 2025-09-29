import { getPosts } from '@/src/entities/post/api/api'

export default async function SSRPage() {
    const { posts, error } = await getPosts()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">SSR Страница</h1>
            <p className="text-text-secondary mb-6">
                Данные загружаются на сервере при каждом запросе.
            </p>
            {error ? (
                <h2 className="text-xl font-semibold">Ошибка: {error}</h2>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Посты:</h2>
                    {posts.slice(0, 5).map((post) => (
                        <div key={post.id} className="p-4 border rounded-lg">
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-text-secondary text-sm">{post.body}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
