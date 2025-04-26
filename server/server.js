import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import notesRouter from './routes/notes.route.js';
import usersRouter from './routes/users.route.js';
import cors from 'cors';
import { connectDB } from './config/database.js';

dotenv.config({
  path: './config/config.env',
});

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/users', usersRouter);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  return res.status(error.status || 500).json({
    success: error.isSuccess || false,
    status: error.status || 500,
    statusText: error.statusText || 'Internal Server Error',
    message: error.message || 'Something went wrong',
  });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // Wait for MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1); // Exit if connection fails
  }
};

startServer();