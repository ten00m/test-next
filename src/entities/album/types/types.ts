export interface IAlbum {
    id: number;
    userId: number;
    title: string;
}

export interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface IAlbumWithPhotos extends IAlbum {
    photos: IPhoto[];
}