'use strict';
'use client';
import { useRouter } from 'next/navigation';
import SearchInputView from '../../baseComponents/SearchInputComponent/SearchInputView';
import AuthorsDropdownComponent from './components/AuthorDropdownComponent/AuthorsDropdownComponent';
import { Alert } from 'react-bootstrap';
import { useAuthorSuggestions } from '../../hooks/useAuthorSuggestions';

export default function AuthorProfilePage() {
  const router = useRouter();
  const { authors, setSearchTerm, error, isLoading } = useAuthorSuggestions();

  const handleOnSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const handleOnSubmitTerm = (term: string) => {
    setSearchTerm(term);
  };
  const handleSelectAuthor = (id: number) => {
    router.push(`authorprofiles/${id}`);
  };

  const a = 15;
  const b = a;
  return (
    <div className="containerMainPage">
      <SearchInputView
        onSearch={handleOnSearchTerm}
        onSubmit={handleOnSubmitTerm}
        placeholder="Search authors..."
      />


      {error && <Alert className="alert-danger">{error}</Alert>}

      {!isLoading && authors.length > 0 && (
        <AuthorsDropdownComponent
          authorsList={authors}
          onSelect={handleSelectAuthor}
        />
      )}
    </div>
  );
}
