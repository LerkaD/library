/* eslint-disable*/
import { fetchAuthorProfileByAuthorId } from '@/services/authorProfileService';
import { fetchAuthorBooks } from '@/services/authorService';
import AuthorProfileClient from './components/AuthorProfileClient/AuthorProfileClient';
import { notFound } from 'next/navigation';

interface AuthorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function AuthorProfilePage({ params }: AuthorProfilePageProps) {
  const { id } = await params;
  console.log('Find profile for author with id', id)

  try {
    const authorProfile = await fetchAuthorProfileByAuthorId(Number(id));
    console.log('faunt profile', authorProfile)
    if (!authorProfile) {
      notFound();
    }
    const authorBooks = await fetchAuthorBooks(Number(id));


    return <AuthorProfileClient authorProfile={authorProfile}
      authorBooks={authorBooks}
    />;

  } catch (error) {
    console.error('Failed to load author profile:', error);
    notFound();
  }
}

// // Исправляем generateMetadata
// export async function generateMetadata({ params }: AuthorProfilePageProps) {
//   const { id } = await params; // ← Тоже добавляем await
//   const authorProfile = await fetchAuthorProfileByAuthorId(Number(id));

//   return {
//     title: authorProfile?.author_name || 'Профиль автора',
//     description: authorProfile?.biography?.substring(0, 160),
//   };
// }