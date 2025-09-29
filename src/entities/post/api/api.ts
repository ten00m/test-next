import { createApi } from '@/src/shared/api'
import { Post } from '@/src/entities/post/types/types'

export interface GetPosts {
    posts: Post[]
    error: string | null
}

export const getPosts = async (): Promise<GetPosts> => {
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
