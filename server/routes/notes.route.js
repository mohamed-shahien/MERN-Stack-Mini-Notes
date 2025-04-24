import express from 'express';
import { getAllNotes, getNote, addNote, updateNote, deleteNote } from '../controller/notes.controller.js';
import {requireAuth}  from '../middlewares/requireAuth.js';
const router = express.Router();
router.use(requireAuth);
router.route('/')
        .get(getAllNotes)
        .post(addNote);
router.route('/:id')
        .get(getNote)
        .put(updateNote)
        .delete(deleteNote);

export default router;