import axios from 'axios';
import { Book, CreateBookData } from '../app/basic_types'

// const API_URL = 'http://localhost:8000/api/books/';

const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5500/api/books/'
    : '/api/books/';
const SSR_API_URL = 'http://django:8000/api/books/';
export const featchBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_URL)
    return response.data
}

export const featchBookByID = async (bookId: number): Promise<Book | null> => {
    try {
        console.log('finnd id:', bookId, '-> URL', `${API_URL}${bookId}/`)
        const response = await axios.get<Book>(`${SSR_API_URL}${bookId}/`)
        return response.data
    }
    catch (error) {
        console.error('Failed to fetch author:', error);
        return null;
    }


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

export const createBook = async (data: CreateBookData): Promise<void> => {
    const {
        title,
        publisher_id,
        authors_ids,
        publish_year,
        description,
        book_image
    } = data;

    await axios.post(API_URL, {
        title: title.trim(),
        publisher_id: publisher_id === undefined || publisher_id === null ? null : publisher_id,
        authors_ids: authors_ids,
        publish_year: publish_year || null,
        description: description || null,
        book_image: book_image || null,
    }, {
        headers: {
            'Content-Type': 'application/json', // Важно для JSON
        }
    });
};