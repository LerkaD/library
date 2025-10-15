import axios from 'axios';
import { Book, CreateBookData } from '../app/basic_types'

const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        return process.env.INTERNAL_API_URL || 'http://django:8000/api';
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();
const BOOKS_API_URL = `${API_BASE_URL}/books/`;

const apiClient = axios.create({
    timeout: 30000,
    timeoutErrorMessage: 'Request timeout',
});

const getAuthHeaders = () => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

apiClient.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout');
            throw new Error('Request timeout - server is not responding');
        }
        if (error.response) {
            console.error('Server error:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('Network error:', error.message);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export const fetchBookByID = async (bookId: number): Promise<Book | null> => {
    try {
        console.log('Fetching book ID:', bookId, 'URL:', `${BOOKS_API_URL}${bookId}/`);

        const response = await apiClient.get<Book>(`${BOOKS_API_URL}${bookId}/`, {
            headers: getAuthHeaders()
        });

        console.log('Successfully fetched book:', response.data.title);
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch book:', error.message);

        if (error.response?.status === 404) {
            console.log('Book not found');
            return null;
        }

        if (error.response?.status >= 500) {
            console.error('Server error, please try again later');
        }

        return null;
    }
}

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await apiClient.get<Book[]>(BOOKS_API_URL, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw error;
    }
}

export const fetchHintBooks = async (substring: string, signal?: AbortSignal): Promise<Book[]> => {
    try {
        const response = await apiClient.get<Book[]>(`${BOOKS_API_URL}?title=${encodeURIComponent(substring)}`, {
            signal,
            headers: getAuthHeaders(),
            timeout: 5000
        });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled for:', substring);
            return [];
        }
        console.error('Failed to fetch hint books:', error);
        return [];
    }
}

export const createBook = async (data: CreateBookData): Promise<void> => {
    try {
        const {
            title,
            publisher_id,
            authors_ids,
            publish_year,
            description,
            book_image,
            genres_ids
        } = data;


        await apiClient.post(BOOKS_API_URL, {
            title: title.trim(),
            publisher_id: publisher_id === undefined || publisher_id === null ? null : publisher_id,
            authors_ids: authors_ids,
            publish_year: publish_year || null,
            description: description || null,
            book_image: book_image || null,
            genres_ids: genres_ids
        }, {
            headers: getAuthHeaders(),
        });
        console.log(data)
        console.log('Book created successfully');
    } catch (error) {
        console.error('Failed to create book:', error);
        throw error;
    }
};