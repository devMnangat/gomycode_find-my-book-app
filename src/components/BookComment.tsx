"use client";

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEllipsisV } from 'react-icons/fa';

const BookComment = ({ bookId, initialComments = [] }: { bookId: string; initialComments: Array<{ id: string; userId: string; text: string }> }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [showDropdownId, setShowDropdownId] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch('/api/books/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, comment: {text: comment, userId: session?.user?.id} }),
      });

      
      if (response.ok) {
        const newComment = await response.json();
        console.log({newComment});
        setComments([...comments, newComment]);
        setComment('');
        toast.success("Comment added successfully");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("An error occurred while adding comment");
      console.error("Error:", error);
    }
  };

  const handleDelete = async (commentId: string, bookId: string) => {
    try {
      const response = await fetch(`/api/books/comment/${commentId}`, {
        method: 'DELETE',
        body: JSON.stringify({ bookId }),
      });

      if (response.ok) {
        setComments(comments.filter(c => c.id !== commentId));
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Failed to delete comment");
      }
    } catch (error) {
      toast.error("An error occurred while deleting comment");
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editCommentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch(`/api/books/comment/${editCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: editCommentText, bookId }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(comments.map(c => (c.id === editCommentId ? updatedComment : c)));
        setEditCommentId(null);
        setEditCommentText('');
        toast.success("Comment updated successfully");
      } else {
        toast.error("Failed to update comment");
      }
    } catch (error) {
      toast.error("An error occurred while updating comment");
      console.error("Error:", error);
    }
  };

  const toggleDropdown = (commentId: string) => {
    setShowDropdownId(prevState => (prevState === commentId ? null : commentId));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          rows={4}
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit
        </button>
      </form>
      <ToastContainer />
      <div>
        {comments.map((c) => (
          <div key={c.id} className="relative mb-4 p-4 border rounded-md bg-white shadow-sm">
            <p>{c.text}</p>
            <FaEllipsisV onClick={() => toggleDropdown(c.id)} className="absolute top-4 right-4 cursor-pointer" />
            {showDropdownId === c.id && (
              <div className="absolute top-8 right-4 w-24 bg-white border rounded-md shadow-md z-10">
                <button
                  onClick={() => handleDelete(c.id, bookId)}
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditCommentId(c.id);
                    setEditCommentText(c.text);
                    setShowDropdownId(null);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  Update
                </button>
              </div>
            )}
            {editCommentId === c.id && (
              <form onSubmit={handleUpdate} className="mt-2">
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded-md"
                />
                <div className="mt-2 flex space-x-2">
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditCommentId(null)}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookComment;
