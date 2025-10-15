// services/authorProfileService.ts
import axios from 'axios';
import { AuthorProfile } from '../app/basic_types';

const getApiBaseUrl = () => {
    if (typeof window === 'undefined') {
        return 'http://nginx:5500/api';
    } else {
        return '/api';
    }
};

// Функция для получения заголовков с токеном
const getAuthHeaders = () => {
    if (typeof window === 'undefined') {
        return {
            'Content-Type': 'application/json',
        };
    }

    const token = localStorage.getItem('access_token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

const API_URL = `${getApiBaseUrl()}/authorprofiles/`;

export const fetchAuthorProfile = async (authorId: number): Promise<AuthorProfile | null> => {
    try {
        const response = await axios.get<AuthorProfile>(`${API_URL}${authorId}/`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author profile:', error);
        return null;
    }
};

export const fetchAllAuthorProfiles = async (): Promise<AuthorProfile[]> => {
    try {
        const response = await axios.get<AuthorProfile[]>(API_URL, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author profiles:', error);
        return [];
    }
};

export const fetchAuthorProfileByAuthorId = async (authorId: number): Promise<AuthorProfile | null> => {
    try {
        const response = await axios.get<AuthorProfile[]>(`${API_URL}?author_id=${authorId}`, {
            headers: getAuthHeaders()
        });

        if (response.data.length > 0) {
            console.log('RESPONSE DATA:', response.data)
            return response.data[0];
        }

        return null;
    } catch (error) {
        console.error('Failed to fetch author profile by author_id:', error);
        return null;
    }
};