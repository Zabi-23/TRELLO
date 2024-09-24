"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByStatus = exports.updateTaskStatus = exports.getTasksByAssignedUser = exports.getTask = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
//taskController.ts
const mongoose_1 = __importDefault(require("mongoose"));
const Task_1 = __importDefault(require("../models/Task"));
//Skapa en uppift 
const createTask = async (req, res) => {
    const { title, description, status, assignedTo, dueDate } = req.body;
    try {
        const newTask = new Task_1.default({ title, description, status, assignedTo, dueDate });
        await newTask.save();
        res.status(201).json({ task: newTask });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.createTask = createTask;
//Läs alla uppifter
const getTasks = async (req, res) => {
    try {
        const tasks = await Task_1.default.find().sort({ createdAt: -1 });
        res.json(tasks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};
exports.getTasks = getTasks;
//Uppdatera en uppift
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, assignedTo, dueDate } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    const updatedTask = await Task_1.default.findByIdAndUpdate(id, { title, description, status, assignedTo, dueDate }, { new: true });
    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    res.json(updatedTask);
};
exports.updateTask = updateTask;
//Ta bort en uppift
const deleteTask = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    await Task_1.default.findByIdAndDelete(_id);
    res.json({ msg: 'Task deleted.' });
};
exports.deleteTask = deleteTask;
//Visa en enskild uppift
const getTask = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    const task = await Task_1.default.findById(_id);
    if (!task) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    res.json(task);
};
exports.getTask = getTask;
//Visa uppifter tilldelade till en specifik användare
const getTasksByAssignedUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ msg: 'User not found.' });
    }
    const tasks = await Task_1.default.find({ assignedTo: userId }).sort({ createdAt: -1 });
    res.json(tasks);
};
exports.getTasksByAssignedUser = getTasksByAssignedUser;
//Uppdatera status på en uppift
const updateTaskStatus = async (req, res) => {
    const { id: _id, status } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    const updatedTask = await Task_1.default.findByIdAndUpdate(_id, { status }, { new: true });
    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }
    res.json(updatedTask);
};
exports.updateTaskStatus = updateTaskStatus;
//Visa uppifter med en specifik status
const getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    const tasks = await Task_1.default.find({ status }).sort({ createdAt: -1 });
    res.json(tasks);
};
exports.getTasksByStatus = getTasksByStatus;
