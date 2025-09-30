import {IAlbum, IPhoto} from "@/src/entities/album/types/types";
import {createApi} from "@/src/shared/api";

interface IAlbums{
    albums: IAlbum[];
    error: null | string;
}

export const getAlbums = async (page: number = 0): Promise<IAlbums> =>{
    const {error, get} = createApi();
    const [from, to] = [10 * page, 10 * (page + 1)];
    const albums = (await get<IAlbum[]>('/albums')).slice(from, to);

    if(error){
        return {
            error: error,
            albums: []
        }
    } else {
        return {
            error: null,
            albums: albums
        }
    }
}

interface IPhotos{
    photos: IPhoto[];
    error: null | string;
}

export const getPhotos = async (albumId: number): Promise<IPhotos> =>{
    const {error, get} = createApi();
    const photos =(await get<IPhoto[]>('/albums/' + albumId + '/photos')).slice(0, 5);

    if(error){
        return {
            photos: [],
            error: error
        }
    } else {
        return {
            photos: photos,
            error: null
        }
    }
}