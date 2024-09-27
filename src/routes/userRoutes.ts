

// userRoutes.ts
import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUsers, 
    updateUser, 
    deleteUser, 
    getUser, 
    resetPassword, 
    getCurrentUser 
} from '../controllers/userController';
import { authMiddleware, authorizeRole } from '../middleware/authMiddleware';

const router = express.Router();

// Registrera och logga in användare
router.post('/register', registerUser); // Ruta för registrering
router.post('/login', loginUser);       // Ruta för inloggning

// Skydda dessa rutter med authMiddleware och authorizeRole
router.get('/', authMiddleware, authorizeRole(['admin']), getUsers); // Endast administratörer kan läsa alla användare
router.get('/:id', authMiddleware, getUser); // Hämta specifik användare
router.put('/:id', authMiddleware, updateUser); // Uppdatera användare
router.get('/me', authMiddleware, getCurrentUser);
router.delete('/:id', authMiddleware, authorizeRole(['admin']), deleteUser); // Endast administratörer kan ta bort användare
router.post('/reset-password', resetPassword); // Återställ lösenord

export default router;




