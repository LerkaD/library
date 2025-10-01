import axios from 'axios';
import { Publisher } from '../app/basic_types'


// const API_URL = 'http://localhost:8000/api/publishers/';

const API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5500/api/publishers/'
    : '/api/publishers/';

export const fetchPublishers = async (): Promise<Publisher[]> => {
    const response = await axios.get<Publisher[]>(API_URL);
    return response.data;
};

export const createPublisher = async (data: { name: string; address: string }): Promise<void> => {
    await axios.post(`${API_URL}`, {
        name: data.name.trim(),
        address: data.address || null,
    });
};

export const updatePublisher = async (publisherId: number, data: { name: string; address: string }): Promise<void> => {
    await axios.patch(`${API_URL}${publisherId}/`, {
        name: data.name.trim(),
        address: data.address || null,
    });
};

export const deletePublisher = async (publisherId: number): Promise<void> => {
    await axios.delete(`${API_URL}${publisherId}/`);
};