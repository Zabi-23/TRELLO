


// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // Justera sökvägen efter behov

// Definiera AuthUser interface för den autentiserade användaren
interface AuthUser {
    id: string;
    role?: string; // Lägg till roll om den finns
}

// Utöka Express Request för att inkludera user
export interface AuthRequest extends Request {
    user?: AuthUser; // Tillåt user att vara AuthUser eller undefined
}

// Generera JWT-token
export const generateToken = (id: string, role?: string): string => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
        expiresIn: '30d', // Token giltig i 30 dagar
    });
};

// Middleware för att autentisera användaren
export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Hämta token från Authorization-headern

    if (!token) {
        return res.status(401).json({ message: 'Ingen token tillhandahållen' });
    }

    try {
        // Verifiera och dekryptera JWT-token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'din-hemlighet') as { id: string; role?: string };
        
        // Hämta användaren från databasen utan lösenordet
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Ingen användare hittades' });
        }

        // Tilldela AuthUser med id och roll till req.user
        req.user = { id: user._id.toString(), role: user.role };
        next(); // Gå vidare till nästa middleware eller rutt
    } catch (error) {
        return res.status(401).json({ message: 'Ogiltig token' });
    }
};

// Exportera alias för authenticateUser om du vill
export const authMiddleware = authenticateUser;

// Middleware för att auktorisera baserat på roller
export const authorizeRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // Kontrollera om användaren har tilldelats en roll och om den matchar de tillåtna rollerna
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.sendStatus(403); // 403 Forbidden
        }
        next(); // Gå vidare till nästa middleware eller rutt om användaren är auktoriserad
    };
};


