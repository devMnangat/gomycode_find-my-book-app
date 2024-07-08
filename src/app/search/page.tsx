"use client"

import DownloadLink from '@/components/DownloadPdf';
import Image from 'next/image';
import { useRef, useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
  };
}

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState<Book[]>([]);
  
  const queryRef = useRef<HTMLInputElement>(null);

  const handleFetchBook = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const query = queryRef.current?.value || '';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_GOOGLEBOOKS_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Error fetching books');
      }

      const result = await response.json();
      setResults(result.items);
    } catch (err) {
      setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="bg-gray-100 p-8 text-center">
      <div className="min-w-md mx-auto flex flex-col items-center bg-theme-natural">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-5">Discover Your Next Read</h1>
        <form onSubmit={handleFetchBook} className="w-full">
          <label htmlFor="query" className="sr-only"><FaSearch /></label>
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
            id="query"
            name="query"
            ref={queryRef}
            placeholder="Enter a Book or Author name ..."
            type="text"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error fetching books. Please try again.</p>}
        </div>

        {/* Search results */}
        {results && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 bg-theme-natural text-black p-4">
          {/* {books.map((books: any, indx: number) => (
            <div key={indx} className=""> */}
          {results
            // .filter(
            //   (r) => r.accessInfo.epub.isAvailable || r.accessInfo.pdf.isAvailable
            // )
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
        )}
      </div>
    // </div>
  );
}