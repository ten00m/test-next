import { createApi } from '@/src/shared/api'
import { Post } from '@/src/entities/post/types/types'

export interface IPosts {
    posts: Post[]
    error: string | null
}

export const getPosts = async (): Promise<IPosts> => {
    const { error, get } = createApi()
    const posts = await get('/posts')

    if (error) {
        return {
            posts: [],
            error: error,
        }
    } else {
        return {
            posts: posts as Post[],
            error: null,
        }
    }
}

interface IPost {
    post: Post | undefined;
    error: string | null;
}

export const createPost = async (postData: Omit<Post, 'id'>): Promise<IPost> => {
    const { error, post } = createApi()
    const createdPost = await post('/posts', postData);

    if (error) {
        return {
            post: undefined,
            error: error,
        }
    } else {
        return {
            post: createdPost as Post,
            error: null,
        }
    }
}