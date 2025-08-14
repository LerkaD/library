import axios from 'axios';
import { Book } from '../app/basic_types'

const API_URL = 'http://localhost:8000/api/books/';


export const featchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_URL)
    return response.data
}

export const fetchHintBooks = async (substring: string, signal?: AbortSignal): Promise<Book[]> => {
    try {
        const response = await axios.get<Book[]>(`${API_URL}?title=${encodeURIComponent(substring)}`,
            { signal });
        return response.data
    }
    catch (error) {
        if (axios.isCancel(error)) {
            return [];
        }
        throw error;
    }
}

export const createBook = async (data: { title: string; publisher_id: number | null; authors_ids: number[] }): Promise<void> => {
    const { title, publisher_id, authors_ids } = data;

    await axios.post(`${API_URL}`, {
        title: title.trim(),
        publisher_id: publisher_id === undefined || publisher_id === null ? null : publisher_id,
        authors_ids: authors_ids,
    });
};
