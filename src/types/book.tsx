export interface Book {
  title: string;
  authors: string[];
  subtitle: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  previewLink: string;
  language: string;
  pageCount: number;
}

export interface Query {
  params: { id: string };
}
