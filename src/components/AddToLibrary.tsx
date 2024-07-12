"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export const AddToLibrary = ({ book }: any) => {
  const { data: session } = useSession();

  const handleSave = async () => {


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
      console.log({formattedBook})
      const res = await fetch("/api/books", {
        body: JSON.stringify({ user: session?.user, book: formattedBook }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw Error("Failed to fetch response");
      const dataResponse = await res.json();
      alert("book added successfully")

      console.log({ dataResponse });
    } catch (error: any) {
      console.log("An error occurred " + error.message);
      alert("error adding book")
    }
  };
  //   if (!book.accessInfo.epub.isAvailable) return null;
  if(!session || !session?.user) return null
  return (
    <div className="flex items-end justify-end">
      <button onClick={handleSave}>
        <IoMdAddCircleOutline className="text-orange-600 text-4xl" />
      </button>{" "}
    </div>
  );
};
