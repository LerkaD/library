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

const apiClient = axios.create({
    baseURL: `${getApiBaseUrl()}/authorprofiles/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchAuthorProfile = async (authorId: number): Promise<AuthorProfile | null> => {
    try {
        const response = await apiClient.get<AuthorProfile>(`${authorId}/`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author profile:', error);
        return null;
    }
};

export const fetchAllAuthorProfiles = async (): Promise<AuthorProfile[]> => {
    try {
        const response = await apiClient.get<AuthorProfile[]>('');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch author profiles:', error);
        return [];
    }
};

export const fetchAuthorProfileByAuthorId = async (authorId: number): Promise<AuthorProfile | null> => {
    try {
        const response = await apiClient.get<AuthorProfile[]>(`?author_id=${authorId}`);

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