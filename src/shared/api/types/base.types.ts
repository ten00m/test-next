export interface ApiResponse<T = unknown> {
    data: T
    status: number
    success: boolean
    headers?: Record<string, string>
}

export interface ApiError {
    message: string
    status: number
    code?: string
    details?: unknown
    timestamp?: string
}

export interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean>
    timeout?: number
    baseURL?: string
}

export interface MutationOptions<TData, TVariables> {
    onSuccess?: (data: TData, variables: TVariables) => void
    onError?: (error: ApiError, variables: TVariables) => void
    onSettled?: (data: TData | null, error: ApiError | null, variables: TVariables) => void
}

export interface UseApiOptions {
    baseURL?: string
    defaultHeaders?: Record<string, string>
}
