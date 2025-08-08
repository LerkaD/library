'use client';

import { useState } from 'react';

type UseSearchInputProps = {
  onSearch: (term: string) => void;
  onSubmit: (term: string) => void;
};

type UseSearchInputReturn = {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export function useSearchInput({
  onSearch,
  onSubmit,
}: UseSearchInputProps): UseSearchInputReturn {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  return { searchTerm, handleChange, handleSubmit };
}