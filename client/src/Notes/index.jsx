import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  const getAllNotes = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`, 
        },
      });
      const data = await response.json();
      if (data.success) {
        setNotes(data.data);
        toast.success("All notes fetched successfully!");
      } else {
        toast.error(data.message || "Failed to fetch notes.");
      }

  };

  useEffect(() => {
    if (user) {
      getAllNotes();
    }
  }, []);

  return (
    <div className="p-4">
      {notes.length === 0 ? (
        <h1>No notes found</h1>
      ) : (
        <>
        
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 max-w-md mx-auto"
            >
              <div className="px-8 py-10 md:px-10">
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
                  {note.title}
                </h2>
                <div className="mt-10">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={note.description}
                      readOnly minLength={10}
                      className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </>
      )}
      <Link
        to="/notes/create"
        className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Note
      </Link>
    </div>
  );
};

export default Notes;
