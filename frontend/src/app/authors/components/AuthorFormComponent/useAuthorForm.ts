import { useState, ChangeEvent } from 'react';

type AuthorFormData = {
  name: string;
  birthdate: string;
};

export const useAuthorForm = (initialName = '', initialBirthdate = '') => {
  const [formData, setFormData] = useState<AuthorFormData>({
    name: initialName,
    birthdate: initialBirthdate,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    onSave: (data: AuthorFormData) => Promise<void>,
  ) => {
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter author name');
      return false;
    }

    setSaving(true);
    try {
      await onSave({
        name: formData.name.trim(),
        birthdate: formData.birthdate,
      });
      return true;
    } catch (err) {
      setError('Error saving author');
      console.error('Save author error:', err);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    formData,
    saving,
    error,
    handleChange,
    handleSubmit,
  };
};
