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
                            ...album,
                            photos: photos
                        })
                    }
                })
                .catch(error => console.log(error))
        }))

    return (
        <div className="min-h-screen bg-element-background py-12 rounded-lg">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-text mb-4">
                            ISR Страница - Альбомы
                        </h1>
                        <p className="text-lg text-text-secondary">
                            Данные обновляются каждые 60 секунд. Обновите страницу через минуту чтобы увидеть изменения.
                        </p>
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-primary text-sm font-medium mt-4">
                            Автообновление каждые 60 секунд
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {albumsWithPhotos.map((album) => (
                            <div key={`album-${album.id}-${album.userId}`} className="bg-element-background filter contrast-80 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-text mb-3 line-clamp-2">
                                        {album.title}
                                    </h2>
                                    <p className="text-text-secondary text-sm mb-4">
                                        Альбом #{album.id} • {album.photos?.length} фотографий
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 mb-4">
                                        {album.photos.map((photo) => (
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

                                    <button className="w-full bg-blue-50 cursor-pointer text-primary py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors text-sm">
                                        Посмотреть все фото
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const revalidate = 60;