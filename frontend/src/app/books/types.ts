export interface Author {
  id: number;
  name: string;
}

export interface Publisher {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  publisher: Publisher | null;
  authors: Author[];
}

export interface BookSimpleComponentProps {
  books: Book[];
}
