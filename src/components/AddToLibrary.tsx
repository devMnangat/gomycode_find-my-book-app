"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface Book {
  volumeInfo: {
    title: string;
    pageCount: number;
    subtitle?: string;
    authors?: string[];
    language?: string;
    previewLink?: string;
    imageLinks?: any; // Specify a more detailed type if possible
  };
}

interface Session {
  user: any; // Specify a more detailed type if possible
}

interface Props {
  book: Book;
}

export const AddToLibrary: React.FC<Props> = ({ book }) => {
  const { data: session } = useSession() as { data: Session };
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const formattedBook = {
        title: book.volumeInfo.title,
        pageCount: book.volumeInfo.pageCount,
        subtitle: book.volumeInfo.subtitle || "test",
        authors: book.volumeInfo.authors || [""],
        language: book.volumeInfo.language || "",
        previewLink: book.volumeInfo.previewLink || "",
        imageLinks: book.volumeInfo.imageLinks,
      };
      console.log({ formattedBook });
      const res = await fetch("/api/books", {
        body: JSON.stringify({ user: session?.user, book: formattedBook }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw Error("Failed to fetch response");
      const dataResponse = await res.json();
      toast.success("Book added successfully");

      console.log({ dataResponse });
    } catch (error: any) {
      console.log("An error occurred: " + error.message);
      toast.error("Error adding book: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session || !session.user) return null;
  return (
    <div className="flex items-end justify-end">
      <button onClick={handleSave} disabled={isLoading}>
        <IoMdAddCircleOutline className="text-orange-600 text-4xl" />
        {isLoading && <span>Saving...</span>}
      </button>
    </div>
  );
};
