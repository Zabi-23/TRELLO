/*  //Task.ts

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


// Task.ts

/* import mongoose, { Schema, Document } from 'mongoose';

// Definiera gränssnittet för Task
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'To-Do' | 'In Progress' | 'Blocked' | 'Done';
    assignedTo?: mongoose.Schema.Types.ObjectId; // Gör detta valfritt
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    finishedBy?: Date; // Gör detta valfritt
    tags?: string[]; // Gör detta valfritt
    projectId?: mongoose.Schema.Types.ObjectId; // Gör detta valfritt
}

// Definiera schema för Task
const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To-Do', 'In Progress', 'Blocked', 'Done'], default: 'To-Do' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
    tags: [{ type: String }],
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
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
const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task;
 */

//Task.ts

 import mongoose, { Schema, Document } from 'mongoose';

// Definiera gränssnittet för Task
export interface ITask extends Document {
    title: string;
    description: string;
    status: 'To-Do' | 'In Progress' | 'Blocked' | 'Done';
    assignedTo?: mongoose.Schema.Types.ObjectId; // Gör detta valfritt
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    finishedBy?: Date; // Gör detta valfritt
    tags?: string[]; // Gör detta valfritt
    projectId?: mongoose.Schema.Types.ObjectId; // Gör detta valfritt
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
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    finishedBy: { type: Date },
    tags: [{ type: String }],
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
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
const Task = mongoose.model<ITask>('Task', taskSchema);
export default Task; 


