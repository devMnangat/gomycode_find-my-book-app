"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { MdFileDownload } from "react-icons/md";

const DownloadLink = ({ book }: any) => {
  const { data: session } = useSession();

  const handleDownload = () => {
    if (!session?.user) {
      alert("You need to login to download");
      return;
    }
    const url = book?.accessInfo?.epub?.downloadLink || null; // Path to your PDF file
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"
    link.download = `${book.volumeInfo.title}-${new Date().getTime()}.epub`; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  if (!book.accessInfo.epub.isAvailable) return null;
  return <div className="flex items-end justify-end"><button onClick={handleDownload} ><MdFileDownload className="text-blue-600 text-4xl" /></button> </div>;
};

export default DownloadLink;
