import axios from 'axios';
import { Genre } from '@/app/basic_types';


const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5500/api/genres/'
    : '/api/genres/';

export const fetchGenres = async (): Promise<Genre[]> => {
    const response = await axios.get<Genre[]>(API_URL);
    return response.data;
};