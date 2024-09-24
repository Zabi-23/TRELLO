//authMiddleware.ts



import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthUser {
    id: string;
    role?: string; // Lägg till roll om den finns
}

interface AuthRequest extends Request {
    user?: AuthUser; // Använd AuthUser för att typa user
}

// Auth Middleware
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user: AuthUser };
        req.user = decoded.user; // Tilldela den rätta strukturen till req.user
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};

// Authorize Role Middleware
export const authorizeRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.sendStatus(403); // 403 Forbidden
        }
        next(); // Gå vidare till nästa middleware eller rutt
    };
};


