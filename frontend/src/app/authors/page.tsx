// 'use client';

// import React, { useState } from 'react';
// import AuthorList from './components/AuthorListComponent/AuthorListComponent';
// import HeaderComponent from '../../baseComponents/SimpleHeaderComponent/SimpleHeaderComponent';
// import AuthorFormView from './components/AuthorFormComponent/AuthorFormView';
// import { DeletingEntityView } from '../../baseComponents/DeletingEntityComponent/DeletingEntityView';
// import { Container, Card, Alert, Stack } from 'react-bootstrap';
// import { useAuthors } from '../../hooks/useAuthors';
// import { Author } from '../../app/basic_types';

// export default function AuthorsPage() {
//   const {
//     authors,
//     error,
//     successMessage,
//     handleCreate,
//     handleUpdate,
//     handleDelete,
//   } = useAuthors();

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
//   const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null);

//   return (
//     <Container className={`containerMainPage`}>
//       <HeaderComponent
//         title="Authors"
//         buttonText="Add author"
//         onButtonClick={() => setShowCreateForm(true)}
//       />

//       <Stack>
//         {error && <Alert className="alert-danger">{error}</Alert>}
//         {successMessage && (
//           <Alert className="alert-success">{successMessage}</Alert>
//         )}
//       </Stack>

//       {showCreateForm && (
//         <Card className="bg-card">
//           <Card.Body>
//             <AuthorFormView
//               show={showCreateForm}
//               onCancel={() => setShowCreateForm(false)}
//               onSave={async (data) => {
//                 const success = await handleCreate(data);
//                 if (success) setShowCreateForm(false);
//               }}
//             />
//           </Card.Body>
//         </Card>
//       )}

//       {!showCreateForm &&
//         !editingAuthor &&
//         !deletingAuthor && (
//           <Card>
//             <Card.Body>
//               <AuthorList
//                 publishers={authors}
//                 onEdit={setEditingAuthor}
//                 onDelete={setDeletingAuthor}
//               />
//             </Card.Body>
//           </Card>
//         )}

//       {editingAuthor && (
//         <Card className="bg-card">
//           <Card.Body>
//             <AuthorFormView
//               show={true}
//               title="Edit author"
//               initialName={editingAuthor.name}
//               initialBirthdate={
//                 editingAuthor.birthdate ? editingAuthor.birthdate : ''
//               }
//               onCancel={() => setEditingAuthor(null)}
//               onSave={async (data) => {
//                 const success = await handleUpdate(editingAuthor.id, data);
//                 if (success) setEditingAuthor(null);
//               }}
//             />
//           </Card.Body>
//         </Card>
//       )}

//       {deletingAuthor && (
//         <DeletingEntityView
//           show={true}
//           entityName={deletingAuthor.name}
//           onCancel={() => setDeletingAuthor(null)}
//           onDelete={async () => {
//             const success = await handleDelete(deletingAuthor.id);
//             if (success) setDeletingAuthor(null);
//           }}
//         />
//       )}
//       <Card />
//     </Container>
//   );
// }
// app/authors/page.tsx
import { fetchAuthors } from '@/services/authorService';
import AuthorsPageClient from './components/AuthorsPageClient/AuthorsPageClient';
import { Author } from '@/app/basic_types';
import { Suspense } from 'react';
import AuthorsSkeleton from '../../baseComponents/SkeletonComponent/SkeletonComponent';

export default async function AuthorsPage() {
  const authors: Author[] = await fetchAuthors();

  return (
    <Suspense fallback={<AuthorsSkeleton />}>
      <AuthorsPageClient initialAuthors={authors} />
    </Suspense>
  );
}