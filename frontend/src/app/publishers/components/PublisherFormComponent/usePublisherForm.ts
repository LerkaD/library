import { useState, ChangeEvent } from 'react';

type PublisherFormData = {
  name: string;
  address: string;
};

export const usePublisherForm = (initialName = '', initialAddress = '') => {
  const [formData, setFormData] = useState<PublisherFormData>({
    name: initialName,
    address: initialAddress,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    onSave: (data: PublisherFormData) => Promise<void>,
  ) => {
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter publisher name');
      return false;
    }

    setSaving(true);
    try {
      await onSave({
        name: formData.name.trim(),
        address: formData.address,
      });
      return true;
    } catch (err) {
      setError('Error saving publisher');
      console.error('Save publisher error:', err);
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
