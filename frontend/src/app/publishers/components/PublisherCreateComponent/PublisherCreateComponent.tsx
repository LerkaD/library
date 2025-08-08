import React, { useState, ChangeEvent } from 'react';
import styles from './PublisherCreateComponent.module.css';

type Props = {
  onSave: (data: { name: string; address: string }) => Promise<void>;
  onCancel: () => void;
};

export default function PublisherCreateComponent({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter publisher name');
      return;
    }
    setSaving(true);
    try {
      await onSave({ name: name.trim(), address });
    } catch (err) {
      setError('Error saving publisher');
      console.error('Save publisher error:', err);
    } finally {
      setSaving(false);
    }
  };

  const onSubmitWrapper = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e).catch((err) => {
      console.error('Unhandled error in form submission:', err);
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onCancel}>
            &times;
          </button>
          <h2 className={styles.modalTitle}>Add Publisher</h2>
        </div>

        <div className={styles.alertContainer}>
          {error && <div className={styles.alertDanger}>{error}</div>}
        </div>

        <div className={styles.modalBody}>
          <form onSubmit={onSubmitWrapper} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Publisher name</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="Enter publisher name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                disabled={saving}
                autoFocus
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <textarea
                className={`${styles.formControl} ${styles.textarea}`}
                rows={3}
                placeholder="Enter address"
                value={address}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setAddress(e.target.value)
                }
                disabled={saving}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={`${styles.button} ${styles.primaryButton}`}
                disabled={saving}
              >
                {saving ? (
                  <span className={styles.spinnerContainer}>
                    <span className={styles.spinner}></span>
                    Saving...
                  </span>
                ) : (
                  'Save'
                )}
              </button>

              <button
                type="button"
                className={`${styles.button} ${styles.lightButton}`}
                onClick={onCancel}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}