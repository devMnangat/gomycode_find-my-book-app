import DownloadLink from "@/components/DownloadPdf";
import { Book } from "@/types/book";
import Image from "next/image";

export default async function BooksPage() {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&download=epub&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_API_KEY}`
  );

  const booksData = await response.json();

  const books = booksData.items;
  if (!Array.isArray(books) || !books.length) return <h1>No books found...</h1>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-5 bg-theme-natural text-black p-4">
      {/* {books.map((books: any, indx: number) => (
        <div key={indx} className=""> */}
      {books
        .filter(
          (b) => b.accessInfo.epub.isAvailable || b.accessInfo.pdf.isAvailable
        )
        .map((book: any) => (
          <div
            key={book.id}
            className="card flex flex-col items-center justify-between p-4 bg-theme-secondary shadow-slate-800 text-gray-300 shadow-2xl rounded-lg"
          >
            <div className="transition-transform duration-300 ease-in-out transform hover:scale-110">
              <Image
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  book.volumeInfo.imageLinks?.smallThumbnail
                }
                alt={book.volumeInfo.title}
                width={100}
                height={100}
                className="w-full rounded-lg object-contain"
              ></Image>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
              <p className="text-sm "> By {book.volumeInfo.authors}</p>
            </div>
            <div className="mx-auto flex justify-between items-end">
              <DownloadLink book={book} />
              <div className="text-md">{book.infolink}</div>
            </div>
          </div>
        ))}
    </div>
    // </div>
  );
}
