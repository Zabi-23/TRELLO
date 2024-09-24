

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { body, validationResult } from 'express-validator';



// Validering av användarens indata

export const createUserValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Interface för autentiserade förfrågningar
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
    };
}

// Registrera användare
export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const payload = { user: { id: newUser.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Logga in användare
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials: User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials: Wrong password.' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Skapa en ny användare (endast för admin)
export const createUser = async (req: AuthenticatedRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;
    const adminId = req.user?.id;

    if (!adminId) {
        return res.status(403).json({ msg: 'Access denied.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ msg: 'User created', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Läs alla användare (endast för admin)
export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Uppdatera en användare
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params; // Hämta ID från URL-parametern
    const { name, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'User not found.' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found.' });
    }

    res.json(updatedUser);
};

// Ta bort en användare
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Läs en specifik användare (endast för inloggade)
export const getUser = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'User not found.' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Middleware för att skydda rutter med JWT
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: Function) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user as { id: string }; // Spara användarinformation i request-objektet
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Återställning av lösenord
export const resetPassword = async (req: Request, res: Response) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email och nytt lösenord krävs' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Användare hittades inte' });
    }

    try {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Lösenordet har återställts' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Serverfel.' });
    }
};





