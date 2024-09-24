
// src/controllers/taskController.ts

import mongoose from 'mongoose';
import {Request, Response } from 'express';
import Task, { ITask } from '../models/Task'; 





/* export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, assignedTo, dueDate } = req.body;

    try {
        const newTask = new Task({ title, description, status, assignedTo, dueDate });
        await newTask.save();

        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
}; */

export const createTask = async (req: Request, res: Response) => {
    const { title, description, dueDate, status, assignedTo } = req.body;

    try {
        const taskPayload = {
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
            status,
            assignedTo: assignedTo || null,
        };

        const newTask = new Task(taskPayload);
        await newTask.save();

        res.status(201).json({ task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};




export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error.' });
    }
};



export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;  
    const { title, description, status, assignedTo, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, assignedTo, dueDate }, { new: true });

    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json(updatedTask);
};




export const deleteTask = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    await Task.findByIdAndDelete(_id);

    res.json({ msg: 'Task deleted.' });
};


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



export const getTasksByAssignedUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ msg: 'User not found.' });
    }

    const tasks = await Task.find({ assignedTo: userId }).sort({ createdAt: -1 });

    res.json(tasks);
};



export const updateTaskStatus = async (req: Request, res: Response) => {
    const { id: _id, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(_id, { status }, { new: true });

    if (!updatedTask) {
        return res.status(404).json({ msg: 'Task not found.' });
    }

    res.json(updatedTask);
};



export const getTasksByStatus = async (req: Request, res: Response) => {
    const { status } = req.params;

    const tasks = await Task.find({ status }).sort({ createdAt: -1 });

    res.json(tasks);
};

 





