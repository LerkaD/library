'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PublisherCreateComponent from './components/PublisherCreateComponent/PublisherCreateComponent';
import PublisherList from './components/PublisherListComponent/PublisherListComponent';
import SkeletonComponent from '../../baseComponents/SkeletonComponent/SkeletonComponent';
import { Button, Card, Alert, Container, Stack } from 'react-bootstrap';

export type Publisher = {
  id: number;
  name: string;
  address: string | null;
};

export default function PublisherPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  //  creation flag
  const [formVisible, setFormVisible] = useState<boolean>(false);
  //for deleting and editing
  const [, setEditPublisher] = useState<Publisher | null>(null);
  const [, setDeletePublisher] = useState<Publisher | null>(null);

  //loading for show skeleton
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    void handleGetPublisher();
  }, []);

  async function handleGetPublisher() {
    setFormError(null);
    setLoading(true);
    try {
      const publishersData = await axios.get<Publisher[]>(
        'http://localhost:8000/api/publishers/',
      );
      setPublishers(publishersData.data);
    } catch (e) {
      setFormError('Loading data error');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePublisher(data: {
    name: string;
    address: string;
  }) {
    try {
      await axios.post('http://localhost:8000/api/publishers/', {
        name: data.name,
        address: data.address || null,
      });
      setFormVisible(false);
      void handleGetPublisher();
    } catch (e) {
      setFormError('Posting data error');
      console.log(e);
    }
  }

  return (
    <>
      <Container className="py-4" style={{ maxWidth: '800px' }}>
        <Card className="mb-4">
          <Card.Body className="text-center">
            <h1>Publishers</h1>
            <Button
              variant="primary"
              onClick={() => {
                setFormVisible(true);
              }}
            >
              Add publisher
            </Button>
          </Card.Body>
        </Card>

        {/* Messages */}
        <Stack gap={3} className="mb-3">
          {formError && <Alert variant="danger">{formError}</Alert>}
        </Stack>

        {/* Create publisher form */}
        {formVisible && !loading && (
          <Card>
            <Card.Body>
              <PublisherCreateComponent
                onSave={handleCreatePublisher}
                onCancel={() => setFormVisible(false)} //for create
              />
            </Card.Body>
          </Card>
        )}

        {/* show publishers list and skeleton */}
        {!formVisible &&
          (loading ? (
            <SkeletonComponent />
          ) : (
            <Card>
              <Card.Body>
                <PublisherList
                  publishers={publishers}
                  onEdit={setEditPublisher}
                  onDelete={setDeletePublisher}
                />
              </Card.Body>
            </Card>
          ))}
      </Container>
    </>
  );
}
