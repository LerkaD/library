// /*eslint-disable */
// import axios from 'axios';
// import { Author } from '../app/basic_types'

// // const API_URL = 'http://localhost:8000/api/authors/';

// const SSR_API_URL = 'http://django:8000/api/authors/';

// const CSR_API_URL = process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5500/api/authors/'
//     : '/api/authors/';


// export const fetchAuthorsSSR = async () => {
//     console.log('SSR_API_URL:', SSR_API_URL)
//     const response = await axios.get(SSR_API_URL);
//     return response.data;
// };

// export const fetchAuthorsCSR = async (): Promise<Author[]> => {
//     console.log('CSR API_URL:', CSR_API_URL)
//     const response = await axios.get<Author[]>(CSR_API_URL);
//     return response.data;
// };

// export const fetchAuthorById = async (authorId: number): Promise<Author | null> => {
//     try {
//         const response = await axios.get<Author>(`${CSR_API_URL}${authorId}/`);
//         return response.data;
//     } catch (error) {
//         console.error('Failed to fetch author:', error);
//         return null;
//     }
// };

// export const fetchAuthorBooks = async (authorId: number) => {
//     try {
//         const response = await axios.get(`${SSR_API_URL}${authorId}/books/`);
//         return response.data
//     } catch (error) {
//         console.error('Error fetching author books:', error);
//     }
// };

// export const createAuthor = async (data: { name: string; birthdate: string }): Promise<void> => {
//     await axios.post(`${CSR_API_URL}`, {
//         name: data.name.trim(),
//         birthdate: data.birthdate || null,
//     });
// };

// export const updateAuthor = async (authorId: number, data: { name: string; birthdate: string }): Promise<void> => {
//     console.log('UPDATE AUTHOR', CSR_API_URL)
//     await axios.patch(`${CSR_API_URL}${authorId}/`, {
//         name: data.name.trim(),
//         birthdate: data.birthdate || null,
//     });
// };

// export const deleteAuthor = async (authorId: number): Promise<void> => {
//     await axios.delete(`${CSR_API_URL}${authorId}/`);
// };

// export const fetchHintAuthors = async (substring: string, signal?: AbortSignal): Promise<Author[]> => {
//     try {
//         const response = await axios.get<Author[]>(`${CSR_API_URL}search/?q=${substring}`, { signal })
//         console.log(response.data)

//         return response.data
//     } catch (error) {
//         if (axios.isCancel(error)) {
//             return [];
//         }
//         throw error;
//     }

// }

/*eslint-disable */
import axios from 'axios';
import { Author } from '../app/basic_types';

// export const getApiBaseUrl = () => {
//     // Для серверного рендеринга (SSR) в Docker
//     if (typeof window === 'undefined') {
//         // В production используем относительный путь, в development - прямой
//         return process.env.NODE_ENV === 'production'
//             ? 'http://django:8000/api'
//             : 'http://django:8000/api';
//         // В случае ошибки возвращаем пустой массив вместо падения
//     }

//     // Для клиентского рендеринга (CSR)
//     return '/api';
// };

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

export const fetchAuthorsSSR = async (): Promise<Author[]> => {
    try {
        console.log('SSR API URL:', AUTHORS_URL);
        const response = await axios.get(AUTHORS_URL);
        return response.data;
    } catch (error) {
        console.error('SSR fetch failed:', error);
        return [];
    }
};

// export async function fetchAuthorsSSR(): Promise<Author[]> {
//     try {
//         const res = await fetch('http://localhost:5500/api/authors/', {
//             cache: 'no-store', // отключить кэширование для динамического запроса на каждом рендере сервером
//         });
//         if (!res.ok) {
//             throw new Error('Failed to fetch authors');
//         }
//         return await res.json();
//     } catch (error) {
//         console.error('SSR fetch failed:', error);
//         return [];
//     }
// }

export const fetchAuthorsCSR = async (): Promise<Author[]> => {
    try {
        console.log('CSR API URL:', AUTHORS_URL);
        const response = await axios.get<Author[]>(AUTHORS_URL);
        return response.data;
    } catch (error) {
        console.error('CSR fetch failed:', error);
        return [];
    }
};

export const fetchAuthorById = async (authorId: number): Promise<Author | null> => {
    try {
        const response = await axios.get<Author>(`${AUTHORS_URL}${authorId}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author:', error);
        return null;
    }
};

export const fetchAuthorBooks = async (authorId: number) => {
    try {
        const response = await axios.get(`${AUTHORS_URL}${authorId}/books/`);
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
    });
};

export const updateAuthor = async (authorId: number, data: { name: string; birthdate: string }): Promise<void> => {
    await axios.patch(`${AUTHORS_URL}${authorId}/`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
    });
};

export const deleteAuthor = async (authorId: number): Promise<void> => {
    await axios.delete(`${AUTHORS_URL}${authorId}/`);
};

export const fetchHintAuthors = async (substring: string, signal?: AbortSignal): Promise<Author[]> => {
    try {
        const response = await axios.get<Author[]>(`${AUTHORS_URL}search/?q=${substring}`, { signal });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            return [];
        }
        console.error('Search failed:', error);
        return [];
    }
};