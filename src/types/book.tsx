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
  comments?: { userId: string; id: string; text: string }[];
  rating: number;
  ratedBy: { userId: string; rating: number }[];
}

export interface Query {
  params: { id: string };
}
