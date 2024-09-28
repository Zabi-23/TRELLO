
//taskController.ts
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task'; 
import Joi from 'joi';

// Definiera schema för validering av tasks
const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('To-Do', 'In Progress', 'Blocked', 'Done').optional(),  // Validera mot tillåtna värden
    assignedTo: Joi.string().optional(),  
    createdAt: Joi.date().optional(),
    finishedBy: Joi.date().optional(),  
    dueDate: Joi.date().optional() 
});

// Skapa en ny task
export const createTask = async (req: Request, res: Response) => {
    const { title, description, dueDate, status, assignedTo } = req.body;

    try {
        // Validera begäran
        const { error } = taskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ errors: error.details.map(d => d.message) });
        }

        // Kontrollera om task med samma titel redan finns
        const existingTask = await Task.findOne({ title });
        if (existingTask) {
            return res.status(400).json({ msg: 'Task with this title already exists.' });
        }

        // Skapa payload för den nya tasken
        const taskPayload: Partial<ITask> = {
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            status: status || 'To-Do',  // Sätt till 'To-Do' om ingen status skickas
            assignedTo: assignedTo || undefined,
            createdAt: new Date() // Lägg till skapad datum
        };

        // Skapa och spara tasken
        const newTask = new Task(taskPayload);
        await newTask.save();

        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Hämta alla tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};

// Uppdatera en task
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { title, description, status, assignedTo, dueDate } = req.body;

    // Validera begäran
    const { error } = taskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    // Kontrollera om ID:t är giltigt
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    // Uppdatera tasken
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, assignedTo, dueDate }, { new: true });

    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json(updatedTask);
};

// Ta bort en task
export const deleteTask = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    const deletedTask = await Task.findByIdAndDelete(_id);
    
    if (!deletedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json({ msg: 'Task deleted.' });
};

// Hämta en specifik task
export const getTask = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    const task = await Task.findById(_id);

    if (!task) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json(task);
};

// Hämta tasks som är tilldelade en specifik användare
export const getTasksByAssignedUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ msg: 'User not found.' });
    }

    const tasks = await Task.find({ assignedTo: userId }).sort({ createdAt: -1 });

    res.json(tasks);
};

// Uppdatera status för en task
export const updateTaskStatus = async (req: Request, res: Response) => {
    const { id: _id, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    const { error } = Joi.object({ status: Joi.string().valid('To-Do', 'In Progress', 'Blocked', 'Done').optional() }).validate({ status });
    if (error) {
        return res.status(400).json({ errors: error.details.map(d => d.message) });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(_id, { status }, { new: true });
    
    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json(updatedTask);
};

// Hämta tasks baserat på status
export const getTasksByStatus = async (req: Request, res: Response) => {
    const { status } = req.params;

    const { error } = Joi.string().valid('To-Do', 'In Progress', 'Blocked', 'Done').validate(status);
    if (error) return res.status(400).send({ message: 'Invalid status value' });

    const tasks = await Task.find({ status }).sort({ createdAt: -1 });

    res.json(tasks);
};


