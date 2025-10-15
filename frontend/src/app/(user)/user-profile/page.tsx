'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    email: string;
    username: string;
    role: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('http://localhost:8000/api/auth/profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    localStorage.setItem('user_data', JSON.stringify(data.user));

                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                router.push('/login');
            }
        };

        fetchUserProfile();
    }, [router]);


    if (!user) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl">Страница пользователя</h1>
            <p className="text-lg">Привет, {user.username}!</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Роль: {user.role}</p>
        </div>
    );
}