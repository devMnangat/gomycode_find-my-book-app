"use client";
import BookComment from "@/components/BookComment";
import Rating from "@/components/Rating";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Book {
  _id: string;
  title: string;
  pageCount: number;
  subtitle?: string;
  authors: string[];
  language: string;
  previewLink?: string;
  imageLinks: {
    thumbnail: string;
  };
  likes: number;
  likedBy: string[];
  comments: { id: string; text: string }[];
}

const Library = () => {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookRatings, setBookRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch(
          "/api/books/library?userId=" + session?.user?.id
        );
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await res.json();
        setBooks(data.recommendedBooks || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }
    if (session) {
      fetchBooks();
    }
  }, [session]);

  const handleDelete = async (bookId: string) => {
    try {
      const res = await fetch(`/api/books/library/${bookId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete book");
      }
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book");
    }
  };

  const handleLike = async (bookId: string, isLike: boolean) => {
    try {
      const res = await fetch(`/api/books/library/${bookId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ like: isLike, userId: session?.user?.id }), // Send user ID
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Response:', errorText);
        throw new Error(`Failed to update like: ${res.status} ${res.statusText}`);
      }
      
      const updatedBook = await res.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, likes: updatedBook.likes } : book
        )
      );
      toast.success(`Book ${isLike ? "liked" : "disliked"} successfully`);
    } catch (error) {
      console.error(`Error ${isLike ? "liking" : "disliking"} book:`, error);
      toast.error(`Failed to ${isLike ? "like" : "dislike"} book`);
    }
  };

  const updateBookRating = (bookId: string, rating: number) => {
    setBookRatings((prevRatings) => ({
      ...prevRatings,
      [bookId]: rating,
    }));
  };

  if (!session) {
    return (
      <p className="text-center mt-10">Please log in to view your library.</p>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10 flex-grow">
      <h1 className="text-4xl font-bold mb-8 text-center">My Library</h1>
      {books.length === 0 ? (
        <p className="text-center">No books saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-700 mb-2">
                  By{" "}
                  {book.authors && Array.isArray(book.authors)
                    ? book.authors.join(", ")
                    : "Unknown Author"}
                </p>
                <p className="text-gray-600 mb-2">Pages: {book.pageCount}</p>
                <p className="text-gray-600 mb-2">Language: {book.language}</p>
                <p className="text-gray-600 mb-2">Likes: {book.likes}</p>
              </div>
              <div>
                <Rating
                  bookId={book._id}
                  initialRating={bookRatings[book._id] || 0}
                  onRatingChange={(rating) =>
                    updateBookRating(book._id, Number(rating))
                  }
                />
                {book.previewLink ? (
                  <Link
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline block mt-2"
                  >
                    Preview
                  </Link>
                ) : (
                  <span className="text-gray-500 block mt-2">
                    No preview available
                  </span>
                )}
                <button
                  onClick={() => handleLike(book._id, true)}
                  className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center"
                >
                  <AiFillLike />
                </button>
                <button
                  onClick={() => handleLike(book._id, false)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <AiFillDislike />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center"
                >
                  <IoMdTrash className="mr-2" /> Delete
                </button>
              </div>
              <BookComment bookId={book._id} initialComments={book.comments} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
