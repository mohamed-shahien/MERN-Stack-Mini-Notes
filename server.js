import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import notesRouter from './routes/notes.route.js';
import usersRouter from './routes/users.route.js';

import { connectDB } from './config/database.js';

dotenv.config({
        path: './config/config.env'
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/users', usersRouter);

app.listen(3000, () => {
        try {
                connectDB();
                console.log('Server is running on port 3000');
                console.log('MongoDB Connected');
        } catch (error) {
                console.error(`Error: ${error.message}`);
                process.exit(1);
        }
});