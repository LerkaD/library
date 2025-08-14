import React from 'react';
import { Form } from 'react-bootstrap';
import { Publisher } from '../../../basic_types';

type PublisherSelectProps = {
  publishers: Publisher[];
  value: number | '';
  onChange: (value: number | '') => void;
};

export const PublisherSelectView: React.FC<PublisherSelectProps> = ({
  publishers,
  value,
  onChange,
}) => {
  return (
    <Form.Select
      value={value}
      onChange={(e) =>
        onChange(e.target.value === '' ? '' : Number(e.target.value))
      }
    >
      <option value="">— Not selected —</option>
      {publishers.map((pub) => (
        <option key={pub.id} value={pub.id}>
          {pub.name}
        </option>
      ))}
    </Form.Select>
  );
};
