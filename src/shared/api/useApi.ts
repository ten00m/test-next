import {  useCallback } from 'react';
import {baseApiUrl} from "@/src/shared/lib/constants";


export function useApi() {
    let loading = false;
    let error: string | null = null;

    const setLoading = (value: boolean) => {
        loading = value;
    }
    const setError = (value: string | null) => {
        error = value;
    }

    const request = useCallback(async <T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> => {
        setLoading(true);
        setError(null);

        try {
            const baseURL = baseApiUrl || '/api'
            const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

            const response = await fetch(fullUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const get = useCallback(<T>(url: string) => {
        return request<T>(url, { method: 'GET' });
    }, [request]);

    const post = useCallback(<T>(url: string, data?: unknown) => {
        return request<T>(url, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }, [request]);

    const put = useCallback(<T>(url: string, data?: unknown) => {
        return request<T>(url, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }, [request]);

    const del = useCallback(<T>(url: string) => {
        return request<T>(url, { method: 'DELETE' });
    }, [request]);

    const clearError = useCallback(() => setError(null), []);

    return {
        loading,
        error,
        get,
        post,
        put,
        delete: del,
        clearError,
    };
}