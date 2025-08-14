/* eslint-disable */
'use client';

import SearchInputView from '../../baseComponents/SearchInputComponent/SearchInputView';
import BookSimpleComponent from './components/BookListComponent/BookListComponent';
import SearchInputSkeletone from '@/baseComponents/SearchInputSkeletone/SearchInputSkeletone';
import { useBook } from '../../hooks/useBook';
import SpecialButton from '@/baseComponents/SpecialButton/specButton';
export default function BooksPage() {
  const { books, loading, error, setSubtitle } = useBook();

  const handleSearchChange = (term: string) => {
    setSubtitle(term);
  };

  const handleSearchSubmit = (term: string) => {
    setSubtitle(term);
  };

  return (
    <div className="containerMainPage">
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <SearchInputSkeletone />
      ) : (
        <SearchInputView
          onSearch={handleSearchChange}
          onSubmit={handleSearchSubmit}
          placeholder="Search for books..."
        />
      )}
      {!loading && !error && <BookSimpleComponent books={books} />}
      <SpecialButton />
    </div>
  );
}
