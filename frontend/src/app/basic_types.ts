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
}

export interface BookSimpleComponentProps {
  books: Book[];
}
