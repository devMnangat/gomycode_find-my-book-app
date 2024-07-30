export interface Book {
  title: string;
  authors: string[];
  subtitle: string;
  imageLinks: { smallThumbnail: string; thumbnail: string };
  previewLink: string;
  language: string;
  pageCount: number;
  likes: number;
  likedBy: string[];
  comments?: { userId: string; text: string }[];
}

export interface Query {
  params: { id: string };
}
