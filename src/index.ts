


// index.ts

import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import winston from 'winston';
import morgan from 'morgan';
import exampleRoutes from './routes/exampelRoutes';
import errorHandler from './middleware/errorHandler';



dotenv.config();

// Skapa Express-applikationen
const app = express();

// Winston logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Anslut till databasen
connectDB();

// Middleware
app.use(express.json()); // För att tolka JSON-data
app.use(cors({
    origin: 'http://localhost:3000', // Tillåt förfrågningar från frontend
}));
app.use(morgan('dev')); // Logga alla inkommande förfrågningar

// API-rutter
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', exampleRoutes);

// Global felhanterare
app.use(errorHandler);

// Standardroute för API
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Exempelroute
app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Starta servern
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app; 




