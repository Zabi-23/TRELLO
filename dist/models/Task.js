"use strict";
/* //Task.ts

import mongoose, {Schema, Document} from 'mongoose';

//Task
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'To-Do' | 'In Progress' | 'Blocked' | 'Done';
    assignedTo: mongoose.Schema.Types.ObjectId;
    dueDate: Date;
    createdAt: Date;
    updatedAt:  Date;
    finishedBy: Date;
}

const taskSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['To-Do', 'In Progress', 'Blocked', 'Done'], default: 'To-Do'},
    assignedTo: {type: Schema.Types.ObjectId, ref: 'User', required: false},
    dueDate: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt:  Date,
    finishedBy: Date,
});

taskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    if (this.status === 'Done' && !this.finishedBy) {
        this.finishedBy = this.updatedAt;
    }
    next();
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Task.ts
const mongoose_1 = __importStar(require("mongoose"));
// Definiera schema för Task
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To-Do', 'In Progress', 'Blocked', 'Done'], default: 'To-Do' },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
    tags: [{ type: String }],
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Project' }
});
// Middleware för att uppdatera updatedAt och finishedBy vid spara
taskSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (this.status === 'Done' && !this.finishedBy) {
        this.finishedBy = this.updatedAt;
    }
    next();
});
// Skapa och exportera Task-modellen
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
