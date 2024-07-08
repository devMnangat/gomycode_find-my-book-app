"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  description: string;
  image?: string;
  infoLink: string;
  rating?: number;
}

interface Recommendation {
  user: string; // Add user field
  recommendedBooks: string[]; // Array of Book ids
  comment?: string;
}

const Save: React.FC = () => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Omit<Book, 'id'>>({
    title: '',
    authors: [''],
    description: '',
    image: '',
    infoLink: '',
    rating: undefined,
  });

  // Assume userId is fetched from some auth context or similar
  const userId = "667d6693222bbfe60d581bfb"; // Replace with actual user ID

  useEffect(() => {
    async function getSavedBooks() {
      try {
        const response = await fetch('/api/recommendations');
        const json = await response.json();
        setSavedBooks(json);
      } catch (err) {
        console.error(err);
      }
    }
    getSavedBooks();
  }, []);

  const handleDeleteBook = async (book: Book) => {
    try {
      const response = await fetch(`/api/recommendations/${book.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
      const json = await response.json();

      if (json.data) {
        setSavedBooks(savedBooks.filter(b => b.id !== json.data.id));
        alert('The book is removed successfully!');
      }
    } catch (error) {
      console.log(error);
      alert('Error removing book');
    }
  };

  const handleAddBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields
    if (!newBook.title || !newBook.authors[0] || !newBook.description || !newBook.infoLink) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create a new recommendation object
    const newRecommendation: Recommendation = {
      user: userId,
      recommendedBooks: [], // Assuming you're adding books later
      comment: "A comment if needed" // Optional
    };

    console.log('Submitting new recommendation:', newRecommendation);

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecommendation),
      });
      const json = await response.json();
      console.log('Response from server:', json);

      if (json.message) {
        alert(`Error: ${json.message}`);
      } else {
        setSavedBooks([...savedBooks, json]);
        setNewBook({ title: '', authors: [''], description: '', image: '', infoLink: '', rating: undefined });
        alert('Recommendation added successfully!');
      }
    } catch (error) {
      console.error('Error adding recommendation:', error);
      alert('Error adding recommendation');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook(prevState => ({
      ...prevState,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  return (
    <div className="container mx-auto my-10 px-5">
      <div className="text-center mb-5">
        <h3 className="text-3xl font-bold text-yellow-600">Saved Books</h3>
      </div>

      <form onSubmit={handleAddBook} className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="authors"
            value={newBook.authors[0]}
            onChange={(e) =>
              setNewBook(prevState => ({
                ...prevState,
                authors: [e.target.value],
              }))
            }
            placeholder="Author"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="description"
            value={newBook.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="image"
            value={newBook.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="infoLink"
            value={newBook.infoLink}
            onChange={handleChange}
            placeholder="Info Link"
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="rating"
            value={newBook.rating || ''}
            onChange={handleChange}
            placeholder="Rating (1-5)"
            className="p-2 border border-gray-300 rounded"
            min="1"
            max="5"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Add Recommendation
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBooks &&
          savedBooks.map((book) => (
            <div key={book.id} className="bg-green-100 p-5 rounded shadow-lg">
              {book.image && (
                <img src={book.image} alt={book.title} className="w-full h-80 object-cover mb-4" />
              )}

              <div className="text-center">
                {book.title && (
                  <h4 className="text-xl font-semibold text-purple-900">{book.title}</h4>
                )}

                {book.authors && (
                  <p className="italic text-gray-600 mt-2">By: {book.authors[0]}</p>
                )}

                {book.description && (
                  <p className="mt-4">{book.description.substr(0, 100)}...</p>
                )}

                {book.infoLink && (
                  <p className="mt-2">
                    <a href={book.infoLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                      View Details
                    </a>
                  </p>
                )}

                {book.rating && (
                  <p className="mt-2">Rating: {book.rating}/5</p>
                )}

                <button
                  onClick={() => handleDeleteBook(book)}
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Save;
