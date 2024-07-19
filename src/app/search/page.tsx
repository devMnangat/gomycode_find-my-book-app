"use client"

import { AddToLibrary } from '@/components/AddToLibrary';
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
      <div className="min-w-md h-screen overflow-scroll mx-auto flex flex-col items-center bg-theme-natural">
      <div className="max-w-md mx-auto flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Discover Your Next Read</h1>
        <div className="bg-white flex items-center justify-center p-2 rounded-xl border border-gray-600">
  <form onSubmit={handleFetchBook} className="w-full flex gap-2">
    <label htmlFor="query" className="sr-only">Search</label>
    <input
      className="w-full p-2 border-none focus:outline-none sm:text-lg md:text-lg lg:text-xl"
      required
      id="query"
      name="query"
      ref={queryRef}
      placeholder="Enter a Book or Author name ..."
      type="text"
    />
    <button
      type="submit"
      className="text-blue-500 p-3 h-fit rounded-lg hover:text-blue-600"
    >
      <FaSearch />
    </button>
  </form>
</div>


        {loading && <p className='sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>Loading...</p>}
        {error && <p className="text-red-500 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">Error fetching books. Please try again.</p>}
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
                  <h2 className="text-xl sm:text-xl md:text-2xl font-semibold">{book.volumeInfo.title}</h2>
                  <p className="sm:text-lg md:text-lg lg:text-xl">{book.volumeInfo.categories}</p>
                </div>
                <div className='flex jusify-between'>
                <div className="mx-auto flex justify-between items-end sm:text-lg md:text-lg lg:text-xl">
                  <DownloadLink book={book} />
                  <div className="text-md sm:text-lg md:text-lg lg:text-xl">{book.infolink}</div>
                </div>
                <div className="mx-auto flex justify-between items-end sm:text-lg md:text-lg lg:text-xl">
              <AddToLibrary book={book} />
              <div className="text-md sm:text-lg md:text-lg lg:text-xl">{book.infolink}</div>
            </div>
            </div>
              </div>
            ))}
        </div>
        )}
      </div>
    // </div>
  );
}
