/*eslint-disable */
import axios from 'axios';
import { Author } from '../app/basic_types';

export const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        // Используем внутренний URL для SSR
        return process.env.INTERNAL_API_URL || 'http://django:8000/api';
    }
    // Для клиента используем относительный путь (через nginx)
    return process.env.NEXT_PUBLIC_API_URL || '/api';
};


const cur_url = getApiBaseUrl()
const AUTHORS_URL = `${cur_url}/authors/`;

const getAuthHeaders = () => {
    // На сервере (SSR) возвращаем только базовые заголовки
    if (typeof window === 'undefined') {
        return {
            'Content-Type': 'application/json',
        };
    }

    // На клиенте (CSR) добавляем токен
    const token = localStorage.getItem('access_token');
    const headers: any = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const fetchAuthorsSSR = async (): Promise<Author[]> => {
    try {
        console.log('CSR API URL:', AUTHORS_URL);
        const response = await axios.get<Author[]>(AUTHORS_URL, {
        });
        return response.data;
    } catch (error) {
        console.error('CSR fetch failed:', error);
        return [];
    }
};

export const fetchAuthorsCSR = async (): Promise<Author[]> => {
    try {
        console.log('CSR API URL:', AUTHORS_URL);
        const response = await axios.get<Author[]>(AUTHORS_URL, {
            headers: getAuthHeaders() // 
        });
        return response.data;
    } catch (error) {
        console.error('CSR fetch failed:', error);
        return [];
    }
};

export const fetchAuthorById = async (authorId: number): Promise<Author | null> => {
    try {
        const response = await axios.get<Author>(`${AUTHORS_URL}${authorId}/`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author:', error);
        return null;
    }
};

export const fetchAuthorBooks = async (authorId: number) => {
    try {
        const response = await axios.get(`${AUTHORS_URL}${authorId}/books/`,
            { headers: getAuthHeaders() }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching author books:', error);
        return [];
    }
};

export const createAuthor = async (data: { name: string; birthdate: string }): Promise<void> => {
    await axios.post(AUTHORS_URL, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
    },
        {
            headers: getAuthHeaders()
        });
};

export const updateAuthor = async (authorId: number, data: { name: string; birthdate: string }): Promise<void> => {
    await axios.patch(`${AUTHORS_URL}${authorId}/`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
    },
        {
            headers: getAuthHeaders()
        });
};

export const deleteAuthor = async (authorId: number): Promise<void> => {
    await axios.delete(`${AUTHORS_URL}${authorId}/`,
        { headers: getAuthHeaders() }
    );
};

export const fetchHintAuthors = async (substring: string, signal?: AbortSignal): Promise<Author[]> => {
    try {
        const response = await axios.get<Author[]>(`${AUTHORS_URL}search/?q=${substring}`,
            {
                signal,
                headers: getAuthHeaders()
            });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            return [];
        }
        console.error('Search failed:', error);
        return [];
    }
};