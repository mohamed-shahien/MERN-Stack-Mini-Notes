import Note from '../models/notes.model.js'
import mongoose from 'mongoose';

export const getAllNotes = async (req, res) => {
        try {
                const notes = await Note.find({userId: req.userId });
                res.status(200).json({
                        success: true,
                        notes,
                });
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
}
export const getNote = async (req, res) => {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
                return res.status(400).json({
                        success: false,
                        message: 'Invalid note ID',
                });
        }
        try {
                const notes = await Note.find({ _id: noteId });
                if (!notes) {
                        return res.status(404).json({
                                success: false,
                                message: 'Note not found',
                        });
                }
                return res.status(200).json({
                        success: true,
                        notes,
                });
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
}
export const addNote = async (req, res) => {
        const userId = req.userId;

        try {
                const note = await Note.create({
                        ...req.body,
                        userId : userId
                });
                res.status(201).json({
                        success: true,
                        data: note,
                });
        } catch (error) {
                res.status(400).json({
                        success: false,
                        error: error.message,
                });
        }
};
export const updateNote = async (req, res) => {
        try {
                const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body);
                if (!updatedNote) {
                        return res.status(404).json({
                                success: false,
                                message: 'Note not found',
                        });
                }
                res.status(200).json({
                        success: true,
                        message: 'Note updated successfully',
                        updatedNote,
                });
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
}

export const deleteNote = async (req, res) => {
        const noteid = req.params.id;
        await Note.findByIdAndDelete(noteid);
        res.status(200).json({
                success: true,
                message: 'Note deleted successfully',
        });
}
