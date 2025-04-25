import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/auth';
import { Link } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const getAllNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
        setNotes(data.notes);
        toast.success("All notes fetched successfully!");
      } else {
        toast.error(data.message || "Failed to fetch notes.");
      }

    } catch (err) {
      console.error("Error fetching notes:", err);
      toast.error("An error occurred while fetching notes.");
    }
  };
 const handleDeleteNote = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`,
      },
    });
    const data = await response.json();
    setNotes(notes.filter(note => note._id !== id));
    if (data.success) {
      toast.success("Note deleted successfully!");
    } else {
      toast.error(data.message || "Failed to delete note.");
    }
  } catch (err) {
    console.error("Error deleting note:", err);
    toast.error("An error occurred while deleting the note.");
  }
};

 
  useEffect(() => {
    if (user) {
      getAllNotes();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.length === 0 ? (
        <h1>No notes found</h1>
      ) : (
        <>

          {notes.map((note) => (
            <div className="rounded" key={note._id}>
              <div
                className="w-full h-64 flex flex-col justify-between dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4" style={{ backgroundColor: note.color }}>
                <div>
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{note.title}</h4>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">{note.description}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                    <p className="text-sm">{note.createdAt}</p>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                      aria-label="edit note" role="button">
                        <Link to={`/notes/update/${note._id}`} className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pencil" width="20"
                        height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z"></path>
                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                      </svg>
                        </Link>
                    </button>
                    <button
                      className="w-8 h-8 rounded-full bg-red-400  flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                      aria-label="edit note" role="button" onClick={() => handleDeleteNote(note._id)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M14 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 7H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
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
