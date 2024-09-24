
//index.ts

import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import winston from 'winston';
import morgan from 'morgan'
import exampleRoutes from '../src/routes/exampelRoutes';
import {Router} from 'express'
import errorHandler from '../src/middleware/errorHandler';


dotenv.config();

const app = express();
// Winston middleware
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});



connectDB();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
}));

app.use(errorHandler);
app.use(morgan('dev'))
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', exampleRoutes);


// Global felhanterare
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Något gick fel!');
});

  
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});


export default app;


