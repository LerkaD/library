'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type Publisher = {
  id: number;
  name: string;
  address: string | null;
};

export default function PublisherPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [formVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPublishers() {
      try {
        const publishersData = await axios.get<Publisher[]>(
          'http://localhost:8000/api/publishers/',
        );
        setPublishers(publishersData.data);
      } catch (e) {
        setFormError('Loading data error');
        console.log(e);
      }
    }

    void fetchPublishers(); 
  }, []);

  async function handleCreatePublisher() {
    if (name.trim() === '') {
      setFormError('Enter publisher name');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/publishers/', {
        name,
        address,
      });
    } catch (e) {
      setFormError('Posting data error');
      console.log(e);
      return;
    }
    try {
      const publishersData = await axios.get<Publisher[]>(
        'http://localhost:8000/api/publishers/',
      );
      setPublishers(publishersData.data);
      setFormError(null); 
    } catch (e) {
      setFormError('Loading data error');
      console.log(e);
    }
    setName('');
    setAddress('');
  }

  return (
    <main style={{ padding: 20 }}>
      <button
        onClick={() => setFormVisible((prev) => !prev)}
        style={{ marginBottom: 20 }}
      >
        {formVisible ? 'Cancel' : 'Add profile'}
      </button>
      {formVisible && (
        <div
          style={{
            marginBottom: 30,
            border: '1px solid #ccc',
            padding: 15,
            maxWidth: 400,
          }}
        >
          <h2>Create publisher</h2>
          <input
            type="text"
            value={name}
            placeholder="Publisher name"
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
          />
          <textarea
            placeholder="Enter publisher address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            style={{
              marginTop: 10,
              width: '100%',
              padding: 8,
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => {
              void handleCreatePublisher();
            }}
            style={{ marginTop: 10 }}
          >
            Create
          </button>
        </div>
      )}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <h1>Publishers</h1>
      <ul>
        {publishers.map((publisher) => (
          <li key={publisher.id}>
            {publisher.id} - {publisher.name} -{' '}
            {publisher.address ?? 'No publisher address'}
          </li>
        ))}
      </ul>
    </main>
  );
}
