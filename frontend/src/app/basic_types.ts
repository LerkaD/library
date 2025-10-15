export type Author = {
  id: number;
  name: string;
  birthdate: string | null;
};

export type Publisher = {
  id: number;
  name: string;
  address: string | null;
};
export interface Genre {
  id: number;
  name: string;
  description?: string;

}
export interface Book {
  id: number;
  title: string;
  publisher: Publisher | null;
  authors: Author[];
  publish_year: number | null;
  description: string | null;
  book_image: string | null;
  book_image_url: string | null;
  genres: Genre[];
}
export interface CreateBookData {
  title: string;
  publisher_id: number | null;
  authors_ids: number[];
  publish_year?: number | null;
  description?: string | null;
  book_image?: string | null; // base64 
  genres_ids: number[];
}
export interface BookSimpleComponentProps {
  books: Book[];
}


export interface AuthorProfile {
  id: number;
  author_id: number;
  author_name: string;
  author_birthdate: string;
  biography: string;
  books_count: number;
}

export interface exBook {
  id: number;
  title: string;
  year?: number;
  author_id?: number;
}


export interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}