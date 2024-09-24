
//userRoutes.ts
import { Router } from 'express';
import { registerUser,
     createUser,
      getUsers, 
      updateUser,
       deleteUser,
        getUser, 
        resetPassword,
         loginUser } from '../controllers/userController';


const router = Router();

// Registrera användare
router.post('/register', registerUser); 

// Skapa en användare
router.post('/', createUser);

// Läs alla användare
router.get('/', getUsers);

// Uppdatera en användare
router.patch('/:id', updateUser);

// Ta bort en användare
router.delete('/:id', deleteUser);

// Läs en specifik användare
router.get('/:id', getUser);

router.post('/reset-password', resetPassword);

// logingUser
router.post('/login', loginUser);

export default router;



