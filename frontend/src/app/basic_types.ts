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

export interface Book {
  id: number;
  title: string;
  publisher: Publisher | null;
  authors: Author[];
  publish_year: number | null;
  description: string | null;
  book_image: string | null;
  book_image_url: string | null;
}
export interface CreateBookData {
  title: string;
  publisher_id: number | null;
  authors_ids: number[];
  publish_year?: number | null;
  description?: string | null;
  book_image?: string | null; // base64 
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
}

export interface exBook {
  id: number;
  title: string;
  year?: number;
  author_id?: number;
}