"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.authenticateJWT = exports.getUser = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = exports.loginUser = exports.registerUser = exports.createUserValidation = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
// Validering av användarens indata
exports.createUserValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
// Registrera användare
const registerUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists.' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ name, email, password: hashedPassword });
        await newUser.save();
        const payload = { user: { id: newUser.id } };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.registerUser = registerUser;
// Logga in användare
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials: User not found.' });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials: Wrong password.' });
        }
        const payload = { user: { id: user.id } };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.loginUser = loginUser;
// Skapa en ny användare (endast för admin)
const createUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    const adminId = req.user?.id;
    if (!adminId) {
        return res.status(403).json({ msg: 'Access denied.' });
    }
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists.' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ msg: 'User created', user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.createUser = createUser;
// Läs alla användare (endast för admin)
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find().sort({ createdAt: -1 });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.getUsers = getUsers;
// Uppdatera en användare
const updateUser = async (req, res) => {
    const { id } = req.params; // Hämta ID från URL-parametern
    const { name, email } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'User not found.' });
    }
    const updatedUser = await User_1.default.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ msg: 'User not found.' });
    }
    res.json(updatedUser);
};
exports.updateUser = updateUser;
// Ta bort en användare
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User_1.default.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User removed' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.deleteUser = deleteUser;
// Läs en specifik användare (endast för inloggade)
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'User not found.' });
    }
    try {
        const user = await User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.getUser = getUser;
// Middleware för att skydda rutter med JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user; // Spara användarinformation i request-objektet
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
// Återställning av lösenord
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email och nytt lösenord krävs' });
    }
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'Användare hittades inte' });
    }
    try {
        user.password = await bcrypt_1.default.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Lösenordet har återställts' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Serverfel.' });
    }
};
exports.resetPassword = resetPassword;
