//Project.ts
import mongoose, { Schema, Document } from 'mongoose';

// Definiera gränssnittet för Project
export interface IProject extends Document {
    name: string;
    tasks?: mongoose.Types.ObjectId[]; // Gör detta valfritt
}

// Definiera schema för Project
const projectSchema: Schema = new Schema({
    name: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

// Skapa och exportera Project-modellen
const Project = mongoose.model<IProject>('Project', projectSchema);
export default Project;


