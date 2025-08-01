// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import LibraryNavBar from '../libraryNavBar';
// import AuthorSearchComponent from './components/AuthorSearchComponent/AuthorSearchComponent';
// import AuthorsDropdownComponent from './components/AuthorDropdownComponent/AuthorsDropdownComponent';
// import { useRouter } from 'next/navigation';
// import { Author } from './types';

// export default function AuthorProfilePage() {
//   const [authors, setAuthors] = useState<Author[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();


//   useEffect(() => {
//     const handler = setTimeout(async () => {
//       if (searchTerm.trim()) {
//         try {
//           setError(null);
//           const response = await axios.get<Author[]>(
//             `http://localhost:8000/api/authors/?name=${encodeURIComponent(searchTerm)}`,
//           );
//           setAuthors(response.data);
//         } catch (err) {
//           setError('Failed to fetch authors');
//           console.error('Search error:', err);
//         }
//       }
//     }, 600);

//     return () => clearTimeout(handler);
//   }, [searchTerm]);


//   const handleSelectAuthor = (id: number) => {
//     router.push(`authorprofiles/${id}`);
//   };

//   return (
//     <>
//       <LibraryNavBar />

//       <AuthorSearchComponent
//         onSearch={setSearchTerm}
//         placeholder="Search authors..."
//       />

//       {error && <div style={{ color: 'red' }}>{error}</div>}

//       <AuthorsDropdownComponent
//         authors={authors}
//         onSelect={handleSelectAuthor}
//       />
//     </>
//   );
// }
/*eslint-disable  */
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import LibraryNavBar from '../libraryNavBar';
import AuthorSearchComponent from './components/AuthorSearchComponent/AuthorSearchComponent';
import AuthorsDropdownComponent from './components/AuthorDropdownComponent/AuthorsDropdownComponent';
import { useRouter } from 'next/navigation';
import { Author } from './types';

export default function AuthorProfilePage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();

    const fetchAuthors = async () => {
      if (!searchTerm.trim()) {
        setAuthors([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get<Author[]>(
          `http://localhost:8000/api/authors`,
          {
            params: { name: searchTerm },
            signal: controller.signal
          }
        );

        setAuthors(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError('Failed to fetch authors');
          console.error('Search error:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchAuthors();
    }, 600);

    return () => {
      controller.abort();
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSelectAuthor = (id: number) => {
    router.push(`authorprofiles/${id}`);
  };

  return (
    <>
      <LibraryNavBar />

      <div className="container mt-4">
        <AuthorSearchComponent
          onSearch={setSearchTerm}
          placeholder="Search authors..."
        />

        {isLoading && <div className="mt-3">Loading...</div>}
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}

        {authors.length > 0 && (
          <AuthorsDropdownComponent
            authors={authors}
            onSelect={handleSelectAuthor}
          />
        )}
      </div>
    </>
  );
}