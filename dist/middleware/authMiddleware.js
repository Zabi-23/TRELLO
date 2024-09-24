"use strict";
//authMiddleware.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Auth Middleware
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Tilldela den rätta strukturen till req.user
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid.' });
    }
};
exports.authMiddleware = authMiddleware;
// Authorize Role Middleware
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
            return res.sendStatus(403); // 403 Forbidden
        }
        next(); // Gå vidare till nästa middleware eller rutt
    };
};
exports.authorizeRole = authorizeRole;
