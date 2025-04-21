import express from 'express';
import { getAllNotes, getNote, addNote, updateNote, deleteNote } from '../controller/notes.controller.js';
const router = express.Router();

router.route('/')
        .get(getAllNotes)
        .post(addNote);
router.route('/:id')
        .get(getNote)
        .put(updateNote)
        .delete(deleteNote);

export default router;