import Note from '../models/notes.model.js'
import mongoose from 'mongoose';
import AppError from '../util/AppError.js';
import { ERROR } from '../util/httpsStat.js';

export const getAllNotes = async (req, res, next) => {
        try {
                const notes = await Note.find({ userId: req.userId });
                res.status(200).json({
                        success: true,
                        notes,
                });
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
        }
}
export const getNote = async (req, res, next) => {
        const noteId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(noteId)) {
                return next(appError.init(false, 400, FAIL, "Invalid note ID"))
        }
        try {
                const note = await Note.findById(noteId);
                if (!note) {
                        return next(appError.init(false, 404, FAIL, 'Note not found'));
                }
                return res.status(200).json({
                        success: true,
                        notes,
                });
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))

        }
}
export const addNote = async (req, res, next) => {
        const userId = req.userId;
        try {
                const note = await Note.create({
                        ...req.body,
                        userId: userId
                });
                res.status(201).json({
                        success: true,
                        data: note,
                });
        } catch (error) {
                return next(AppError.init(false, 400, ERROR, error.message))
        }
};
export const updateNote = async (req, res, next) => {
        try {
                const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body);
                if (!updatedNote) return next(appError.init(false, 404, FAIL, 'Note not found'));
                res.status(200).json({
                        success: true,
                        message: 'Note updated successfully',
                        updatedNote,
                });
        } catch (error) {
                return next(AppError.init(false, 500, ERROR, error.message))
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
