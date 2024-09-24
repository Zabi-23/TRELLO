"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Registrera användare
router.post('/register', userController_1.registerUser);
// Skapa en användare
router.post('/', userController_1.createUser);
// Läs alla användare
router.get('/', userController_1.getUsers);
// Uppdatera en användare
router.patch('/:id', userController_1.updateUser);
// Ta bort en användare
router.delete('/:id', userController_1.deleteUser);
// Läs en specifik användare
router.get('/:id', userController_1.getUser);
router.post('/reset-password', userController_1.resetPassword);
// logingUser
router.post('/login', userController_1.loginUser);
exports.default = router;
