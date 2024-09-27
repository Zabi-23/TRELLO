
//taskRoutes.ts
import {Router} from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getTask,
    getTasksByAssignedUser,
    updateTaskStatus,
    getTasksByStatus
} from '../controllers/taskController';

const router = Router();

// Skapa en uppift
router.post('/', createTask);

// Läs alla uppifter
router.get('/', getTasks);

// Uppdatera en uppift
router.patch('/:id', updateTask);

// Ta bort en uppift
router.delete('/:id', deleteTask);

// Visa en enskild uppift
router.get('/:id', getTask);

// Visa uppifter tilldelade till en specifik användare
router.get('/assigned/:userId', getTasksByAssignedUser);

// Uppdatera status på en uppift
router.patch('/status/:id', updateTaskStatus);

// Visa uppifter med en specifik status
router.get('/status/:status', getTasksByStatus);

export default router;




 

// src/routes/taskRoutes.ts


/*  */