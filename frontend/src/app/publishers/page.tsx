'use client';

import { useState } from 'react';
import PublisherFormView from './components/PublisherFormComponent/PublisherFormView';
import PublisherList from './components/PublisherListComponent/PublisherListComponent';
import SkeletonComponent from '../../baseComponents/SkeletonComponent/SkeletonComponent';
import { Card, Alert, Container, Stack } from 'react-bootstrap';
import HeaderComponent from '../../baseComponents/SimpleHeaderComponent/SimpleHeaderComponent';
import { Publisher } from '../basic_types';
import { usePublishers } from '../../hooks/usePublishers';
import { DeletingEntityView } from '../../baseComponents/DeletingEntityComponent/DeletingEntityView';

export default function PublisherPage() {
  const {
    publishers,
    loading,
    error,
    successMessage,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePublishers();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(
    null,
  );
  const [deletingAPublisher, setDeletingPublisher] = useState<Publisher | null>(
    null,
  );

  return (
    <Container className="containerMainPage">
      <HeaderComponent
        title="Publishers"
        buttonText="Add publisher"
        onButtonClick={() => {
          setEditingPublisher(null);
          setShowCreateForm(true);
        }}
      />

      {/* Messages */}
      <Stack>
        {error && <Alert className="alert-danger">{error}</Alert>}
        {successMessage && (
          <Alert className="alert-success">{successMessage}</Alert>
        )}
      </Stack>

      {/* Create publisher form */}
      {showCreateForm && !loading && (
        <Card>
          <Card.Body>
            <PublisherFormView
              show={showCreateForm}
              title="Add publisher"
              onSave={async (data) => {
                const success = await handleCreate(data);
                if (success) setShowCreateForm(false);
              }}
              onCancel={() => setShowCreateForm(false)}
            />
          </Card.Body>
        </Card>
      )}

      {/* show publishers list and skeleton */}
      {!showCreateForm &&
        !editingPublisher &&
        (loading ? (
          <SkeletonComponent />
        ) : (
          <Card>
            <Card.Body>
              <PublisherList
                publishers={publishers}
                onEdit={setEditingPublisher}
                onDelete={setDeletingPublisher}
              />
            </Card.Body>
          </Card>
        ))}

      {/* edit publisher form */}
      {editingPublisher && (
        <Card>
          <Card.Body>
            <PublisherFormView
              show={true}
              initialName={editingPublisher.name}
              initialAddress={
                editingPublisher.address
                  ? editingPublisher.address
                  : 'No address in database'
              }
              title="Edit Publisher"
              onSave={async (data) => {
                const success = await handleUpdate(editingPublisher.id, data);
                if (success) setEditingPublisher(null);
              }}
              onCancel={() => setEditingPublisher(null)}
            />
          </Card.Body>
        </Card>
      )}

      {/* deleting publisher form */}
      {deletingAPublisher && (
        <Card>
          <Card.Body>
            <DeletingEntityView
              show={true}
              entityName={deletingAPublisher.name}
              onCancel={() => setDeletingPublisher(null)}
              onDelete={async () => {
                const success = await handleDelete(deletingAPublisher.id);
                if (success) setDeletingPublisher(null);
              }}
            />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
