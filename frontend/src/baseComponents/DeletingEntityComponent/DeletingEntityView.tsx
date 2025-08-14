import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import styles from './DelitingEntityView.module.scss'

type DeleteDialogProps = {
  show: boolean;
  entityName: string;
  onDelete: () => Promise<void>;
  onCancel: () => void;
};

export const DeletingEntityView: React.FC<DeleteDialogProps> = ({
  show,
  entityName,
  onDelete,
  onCancel,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Do you really want to delete <strong>{entityName}</strong>?
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={deleting}>
          Cancel

        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? (
            <>
              <Spinner className={styles.customSpinner} />
              Deleting...
            </>
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};