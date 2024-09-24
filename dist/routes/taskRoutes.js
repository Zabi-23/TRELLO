"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//taskRoutes.ts
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// Skapa en uppift
router.post('/', taskController_1.createTask);
// Läs alla uppifter
router.get('/', taskController_1.getTasks);
// Uppdatera en uppift
router.patch('/:id', taskController_1.updateTask);
// Ta bort en uppift
router.delete('/:id', taskController_1.deleteTask);
// Visa en enskild uppift
router.get('/:id', taskController_1.getTask);
// Visa uppifter tilldelade till en specifik användare
router.get('/assigned/:userId', taskController_1.getTasksByAssignedUser);
// Uppdatera status på en uppift
router.patch('/status/:id', taskController_1.updateTaskStatus);
// Visa uppifter med en specifik status
router.get('/status/:status', taskController_1.getTasksByStatus);
exports.default = router;
