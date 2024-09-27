


// userController.ts
import { Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken, AuthRequest } from '../middleware/authMiddleware'; 

// Registrera användare
export const registerUser = async (req: AuthRequest, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Alla fält krävs' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Användare finns redan' });
        }

        // Skapa användaren
        const user: IUser = await User.create({ name, email, password, role });

        // Generera token
        const token = generateToken(user._id.toString(), user.role || 'user'); 

        // Returnera svaret
        res.status(201).json({
            message: 'Användare registrerad',
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (error) {
        console.error('Fel vid registrering av användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Logga in användare
export const loginUser = async (req: AuthRequest, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Alla fält krävs' });
    }

    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Ogiltiga referenser' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Ogiltiga referenser' });
        }

        const token = generateToken(user._id.toString(), user.role || 'user');

        res.json({
            message: 'Inloggning lyckades',
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (error) {
        console.error('Fel vid inloggning:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Läs alla användare (endast administratörer)
export const getUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Uppdatera en användare (endast för den inloggade användaren)
export const updateUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user: IUser | null = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.json({ message: 'Användare uppdaterad', updatedUser });
    } catch (error) {
        console.error('Fel vid uppdatering av användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Ta bort en användare (endast för den inloggade användaren)
export const deleteUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const user: IUser | null = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }

        await User.findByIdAndDelete(id);
        res.json({ message: 'Användare borttagen' });
    } catch (error) {
        console.error('Fel vid borttagning av användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Läs en specifik användare
export const getUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    try {
        const user: IUser | null = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }

        res.json(user);
    } catch (error) {
        console.error('Fel vid hämtning av användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Återställ lösenord
export const resetPassword = async (req: AuthRequest, res: Response) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'E-post och nytt lösenord krävs' });
    }

    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Lösenordet har återställts' });
    } catch (error) {
        console.error('Fel vid återställning av lösenord:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

// Hämta den aktuella användarens information
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(404).json({ message: 'Ingen användare hittades' });
    }

    try {
        const user: IUser | null = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Användare hittades inte' });
        }

        res.json(user);
    } catch (error) {
        console.error('Fel vid hämtning av aktuell användare:', error);
        res.status(500).json({ message: 'Serverfel' });
    }
};

