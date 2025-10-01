/*eslint-disable */
import { fetchAuthorsSSR } from '@/services/authorService';
import AuthorsPageClient from './components/AuthorsPageClient/AuthorsPageClient';
import { Author } from '@/app/basic_types';
import { Suspense } from 'react';
import AuthorsSkeleton from '../../baseComponents/SkeletonComponent/SkeletonComponent';
export const dynamic = 'force-dynamic';

export default async function AuthorsPage() {
  let authors: Author[] = [];
  try {
    console.log('SSR fetchAuthorsSSR called')
    authors = await fetchAuthorsSSR();
    console.log('data in page', authors)
  } catch (error) {
    console.error('Failed to load authors on server', error);
  }

  return (
    <Suspense fallback={<AuthorsSkeleton />}>
      <AuthorsPageClient initialAuthors={authors} />
    </Suspense>
  );
}

