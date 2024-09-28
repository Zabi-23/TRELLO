

import mongoose, { Schema, Document } from 'mongoose';

// Definiera gränssnittet för Task
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'To-Do' | 'In Progress' | 'Blocked' | 'Done';
    assignedTo?: mongoose.Types.ObjectId; // Valfritt fält för användarreferens
    createdAt: Date;
    updatedAt: Date; // Nya fält
    finishedBy?: Date; // Valfritt fält
    dueDate?: Date; // Valfritt fält
    tags?: string[]; // Valfritt fält för taggar
    projectId?: mongoose.Types.ObjectId; // Valfritt fält för projektreferens
}

// Definiera schema för Task
const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['To-Do', 'In Progress', 'Blocked', 'Done'], 
        default: 'To-Do' 
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
    tags: [{ type: String }],
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

// Middleware för att uppdatera updatedAt och finishedBy vid spara
taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Uppdatera updatedAt varje gång uppgiften sparas
    if (this.status === 'Done' && !this.finishedBy) {
        this.finishedBy = this.updatedAt; // Sätt finishedBy till updatedAt om uppgiften är klar
    }
    next();
});

// Skapa och exportera Task-modellen
const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;

