import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/auth'
import { useNavigate } from 'react-router-dom'

const UpdateNote = () => {
        const { id } = useParams()
        const { user } = useAuth()
        const [isLoading, setIsLoading] = useState(true)
        const [title, setTitle] = useState('')
        const [color, setColor] = useState('#000000')
        const [description, setDescription] = useState('')
        const navigator = useNavigate()

        const handleSubmit = async (e) => {
                e.preventDefault()
                const updatedNote = {
                        title,
                        color,
                        description
                };
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`, {
                        method: 'PUT',
                        headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user}`
                        },
                        body: JSON.stringify(updatedNote)
                });
                const data = await response.json();
                if (data.success) {
                        setTitle('')
                        setColor('#000000')
                        setDescription('')
                        toast.success("Note updated successfully!");
                        navigator('/notes')
                } else {
                        toast.error(data.message || "Failed to update note.");
                }
        }
        const GetNote = async () => {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes/${id}`, {
                        method: 'GET',
                        headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user}`
                        }
                });
                const data = await response.json();
                setIsLoading(false)
                const note = data.notes[0];

                if (data.success) {
                        setTitle(note.title)
                        setColor(note.color)
                        setDescription(note.description)
                } else {
                        toast.error(data.message || "Failed to fetch note.");
                }
        }
        useEffect(() => {
                if (user) {
                        GetNote()
                        setIsLoading(false)
                }
        }, [user])
        if (isLoading) {
                return (
                        <div className="flex items-center justify-center h-screen">
                                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        </div>
                )
        }
        return (
                <div
                        class="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                        <h2 class="text-2xl font-bold text-white mb-6">Update Your Note</h2>
                        <form onSubmit={handleSubmit}>
                                <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-300" htmlFor="title"
                                        >Title Note</label>
                                        <input
                                                class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                        />
                                </div>

                                <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-300" htmlFor="color">
                                                Color Note
                                        </label>
                                        <div className="mt-1 flex items-center gap-3">
                                                <input
                                                        className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white w-1/2"
                                                        name="color"
                                                        id="color"
                                                        type="color"
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)}
                                                />
                                                <div
                                                        className="w-1/2 h-6 rounded border border-white"
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                ></div>
                                        </div>
                                </div>

                                <div class="mb-4">
                                        <label class="block text-sm font-medium text-gray-300" htmlFor="description"
                                        >Description Note</label>
                                        <textarea
                                                class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                                rows="3"
                                                name="description"
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                </div>
                                <div class="flex justify-end">
                                        <button
                                                class="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                                                type="submit"
                                        >
                                                Save Changes
                                        </button>
                                </div>
                        </form>
                </div>
        )
}

export default UpdateNote
