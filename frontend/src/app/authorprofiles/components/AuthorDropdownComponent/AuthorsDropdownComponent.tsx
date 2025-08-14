'use client';
import { Card, ListGroup } from 'react-bootstrap';
import { Author } from '../../../basic_types';
import styles from './AuthorsDropdownComponent.module.css';

interface AuthorsDropdownProps {
  authorsList: Author[];
  onSelect: (authorId: number) => void;
}

export default function AuthorsDropdownComponent({
  authorsList,
  onSelect,
}: AuthorsDropdownProps) {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <ListGroup variant="flush">
          {authorsList.map((author) => (
            <ListGroup.Item
              key={author.id}
              action
              onClick={() => onSelect(author.id)}
              className={styles.listGroupItem}
            >
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{author.name}</span>
                {author.birthdate && (
                  <small className={styles.yearText}>
                    {new Date(author.birthdate).getFullYear()}
                  </small>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}
