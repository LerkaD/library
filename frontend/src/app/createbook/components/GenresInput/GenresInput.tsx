'use client'
import { useState, useEffect } from 'react';
import { Genre } from '@/app/basic_types';
import { fetchGenres } from '@/services/genreServise';
import { Row, Col, Form, Spinner } from 'react-bootstrap';

interface GenreSelectorProps {
    selectedGenres: number[];
    onGenresChange: (genreIds: number[]) => void;
}

export const GenreSelector: React.FC<GenreSelectorProps> = ({
    selectedGenres,
    onGenresChange,
}) => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const genresData = await fetchGenres();
                setGenres(genresData);
            } catch (error) {
                console.error('Error loading genres:', error);
                setError('Failed to load genres');
            } finally {
                setLoading(false);
            }
        };
        loadGenres();
    }, []);

    const handleGenreToggle = (genreId: number) => {
        const newSelectedGenres = selectedGenres.includes(genreId)
            ? selectedGenres.filter(id => id !== genreId)
            : [...selectedGenres, genreId];
        onGenresChange(newSelectedGenres);
    };

    // Улучшил обработку загрузки и ошибок
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" variant="primary" size="sm" className="me-2" />
                <span>Loading genres...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-danger text-center py-2">
                {error}
            </div>
        );
    }

    if (genres.length === 0) {
        return (
            <div className="text-muted text-center py-2">
                No genres available
            </div>
        );
    }

    const midIndex = Math.ceil(genres.length / 2);
    const firstColumnGenres = genres.slice(0, midIndex);
    const secondColumnGenres = genres.slice(midIndex);

    return (
        <div className="genre-selector">
            <div
                className="border rounded p-3"
                style={{
                    maxHeight: '120px', // 3 строки
                    overflowY: 'auto',
                }}
            >
                <Row>
                    {/* Первая колонка */}
                    <Col md={6}>
                        {firstColumnGenres.map(genre => (
                            <Form.Check
                                key={genre.id}
                                type="checkbox"
                                id={`genre-${genre.id}`}
                                label={genre.name}
                                checked={selectedGenres.includes(genre.id)}
                                onChange={() => handleGenreToggle(genre.id)}
                                className="mb-2"
                            />
                        ))}
                    </Col>

                    {/* Вторая колонка */}
                    <Col md={6}>
                        {secondColumnGenres.map(genre => (
                            <Form.Check
                                key={genre.id}
                                type="checkbox"
                                id={`genre-${genre.id}-col2`}
                                label={genre.name}
                                checked={selectedGenres.includes(genre.id)}
                                onChange={() => handleGenreToggle(genre.id)}
                                className="mb-2"
                            />
                        ))}
                    </Col>
                </Row>
            </div>

            <div className="mt-2">
                <small className="text-muted">
                    Selected: {selectedGenres.length} genre(s)
                </small>
            </div>
        </div>
    );
};