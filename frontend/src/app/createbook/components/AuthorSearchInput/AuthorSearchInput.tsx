// import React from 'react';
// import { InputGroup, Form, Button, Card, ListGroup } from 'react-bootstrap';
// import { useAuthorSearch } from './useAuthorSearch';
// import { Author } from '../../../../app/basic_types';

// type AuthorSearchInputProps = {
//   value: string;
//   onChange: (value: string) => void;
//   onAdd: (author: Author) => void;
//   existingAuthorIds: number[];
// };

// export const AuthorSearchInput: React.FC<AuthorSearchInputProps> = ({
//   value,
//   onChange,
//   onAdd,
//   existingAuthorIds,
// }) => {
//   const { suggestions, isLoading, error, handleAdd, isAlreadyAdded } =
//     useAuthorSearch({ value, existingAuthorIds, onAdd });

//   const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(e.target.value);
//   };

//   return (
//     <div>
//       <InputGroup>
//         <Form.Control
//           type="text"
//           value={value}
//           onChange={handleOnChange}
//           placeholder="Search authors"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               handleAdd();
//             }
//           }}
//         />
//         <Button
//           variant="outline-secondary"
//           onClick={handleAdd}
//           disabled={!value.trim()}
//         >
//           Add
//         </Button>
//       </InputGroup>

//       {value && (
//         <div className="mt-2">
//           {isLoading ? (
//             <div className="text-muted">Loading suggestions...</div>
//           ) : error ? (
//             <div className="text-danger">{error}</div>
//           ) : suggestions.length > 0 ? (
//             <Card>
//               <ListGroup variant="flush">
//                 {suggestions.map((author) => (
//                   <ListGroup.Item
//                     key={author.id}
//                     action
//                     onClick={() => onAdd(author)}
//                     disabled={isAlreadyAdded(author.id)}
//                   >
//                     {author.name}
//                     {isAlreadyAdded(author.id) && ' (already added)'}
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Card>
//           ) : (
//             <div className="text-muted">No authors found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


import React from 'react';
import { InputGroup, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { useAuthorSearch } from './useAuthorSearch';
import { Author } from '../../../../app/basic_types';

type AuthorSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAdd: (author: Author) => void;
  existingAuthorIds: number[];
};

export const AuthorSearchInput: React.FC<AuthorSearchInputProps> = ({
  value,
  onChange,
  onAdd,
  existingAuthorIds,
}) => {
  const { suggestions, isLoading, error, handleAdd, isAlreadyAdded } =
    useAuthorSearch({ value, existingAuthorIds, onAdd });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleAddAuthor = (author: Author) => {
    if (!isAlreadyAdded(author.id)) {
      onAdd(author);
      onChange('');
    }
  };

  return (
    <div>
      <InputGroup>
        <Form.Control
          type="text"
          value={value}
          onChange={handleOnChange}
          placeholder="Search authors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
        <Button
          variant="outline-secondary"
          onClick={handleAdd}
          disabled={!value.trim() || (suggestions.length > 0 && isAlreadyAdded(suggestions[0].id))}
        >
          Add
        </Button>
      </InputGroup>

      {value && (
        <div className="mt-2">
          {isLoading ? (
            <div className="text-muted">Loading suggestions...</div>
          ) : error ? (
            <div className="text-danger">{error}</div>
          ) : suggestions.length > 0 ? (
            <Card>
              <ListGroup variant="flush">
                {suggestions.map((author) => (
                  <ListGroup.Item
                    key={author.id}
                    action
                    onClick={() => handleAddAuthor(author)}
                    disabled={isAlreadyAdded(author.id)}
                    style={{ cursor: isAlreadyAdded(author.id) ? 'not-allowed' : 'pointer' }}
                  >
                    {author.name}
                    {isAlreadyAdded(author.id) && ' (already added)'}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          ) : value.trim() ? (
            <div className="text-muted">No authors found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};