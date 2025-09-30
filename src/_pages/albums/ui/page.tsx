import Image from 'next/image';
import {getAlbums, getPhotos} from "@/src/entities/album/api/api";
import {IAlbumWithPhotos} from "@/src/entities/album/types/types";

export async function Albums() {
    const {albums, error} = await getAlbums(0);

    const albumsWithPhotos: IAlbumWithPhotos[] = [];

        await Promise.all(albums.map(album => {
            return getPhotos(album.id)
                .then(({photos, error}) => {
                    if(!error){
                        albumsWithPhotos.push({
                            album,
                            photos: photos
                        })
                    }
                })
                .catch(error => console.log(error))
        }))

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            ISR Страница - Альбомы
                        </h1>
                        <p className="text-lg text-gray-600">
                            Данные обновляются каждые 60 секунд. Обновите страницу через минуту чтобы увидеть изменения.
                        </p>
                        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mt-4">
                            ⚡ Автообновление каждые 60 секунд
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {albumsWithPhotos.map((el) => (
                            <div key={`album-${el.album.id}-${el.album.userId}`} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {el.album.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Альбом #{el.album.id} • {el.photos?.length} фотографий
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {el.photos.map((photo) => (
                                            <div key={photo.id} className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                                                {/*<Image*/}
                                                {/*    src={photo.thumbnailUrl}*/}
                                                {/*    alt={photo.title}*/}
                                                {/*    fill*/}
                                                {/*    className="object-cover hover:scale-105 transition-transform"*/}
                                                {/*    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"*/}
                                                {/*/>*/}
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full bg-purple-50 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors text-sm">
                                        Посмотреть все фото
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h3 className="font-semibold text-purple-900 mb-2">О ISR</h3>
                        <p className="text-purple-800 text-sm">
                            Incremental Static Regeneration: Статические страницы которые могут обновляться после сборки.
                            Идеально для контента который меняется периодически (каталоги, блоги, новости).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const revalidate = 60;