import React, { useState } from 'react'
import { useAuth } from '../../contexts/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateNote = () => {
        const [title, setTitle] = useState('')
        const [color, setColor] = useState('#000000')
        const [description, setDescription] = useState('')
        const { user } = useAuth()
        const navigate = useNavigate()
        const handleSubmit = async (e) => {
                e.preventDefault()
                const newNote = {
                        title,
                        color,
                        description
                };
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/notes`, {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user}`
                        },
                        body: JSON.stringify(newNote)
                });
                const data = await response.json();
                if (data.success) {
                        setTitle('')
                        setColor('#000000')
                        setDescription('')
                        toast.success("Note created successfully!");
                        navigate('/notes')
                } else {
                        toast.error(data.message || "Failed to create note.");
                }
                console.log(data);
        }
        return (
                <>
                        <div
                                class="max-w-md mx-auto relative overflow-hidden z-10 bg-gray-800 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
                                <h2 class="text-2xl font-bold text-white mb-6">Update Your Profile</h2>
                                <form  onSubmit={handleSubmit}>
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
                                        
                                        <div class="mb-4">
                                                <label class="block text-sm font-medium text-gray-300" htmlFor="color"
                                                >Color Note</label>
                                                <input
                                                        class="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white"
                                                        name="color"
                                                        id="color"
                                                        type="color"
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)}
                                                />
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

                </>
        )
}

export default CreateNote
