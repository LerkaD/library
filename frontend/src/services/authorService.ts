import axios from 'axios';
import { Author } from '../app/basic_types'

const API_URL = 'http://localhost:8000/api/authors/';

export const fetchAuthors = async (): Promise<Author[]> => {
    const response = await axios.get<Author[]>(API_URL);
    return response.data;
};

export const createAuthor = async (data: { name: string; birthdate: string }): Promise<void> => {
    await axios.post(`${API_URL}`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
    });
};

export const updateAuthor = async (authorId: number, data: { name: string; birthdate: string }): Promise<void> => {
    await axios.patch(`${API_URL}${authorId}/`, {
        name: data.name.trim(),
        birthdate: data.birthdate || null,
    });
};

export const deleteAuthor = async (authorId: number): Promise<void> => {
    await axios.delete(`${API_URL}${authorId}/`);
};

export const fetchHintAuthors = async (substring: string, signal?: AbortSignal): Promise<Author[]> => {
    try {
        const response = await axios.get<Author[]>(`${API_URL}search/?q=${substring}`, { signal })
        console.log(response.data)

        return response.data
    } catch (error) {
        if (axios.isCancel(error)) {
            return [];  // Если запрос отменён, вернуть пустой массив
        }
        throw error; // Иначе пробросить ошибку вверх
    }

}