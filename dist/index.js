"use strict";
//index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
const exampelRoutes_1 = __importDefault(require("../src/routes/exampelRoutes"));
const errorHandler_1 = __importDefault(require("../src/middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Winston middleware
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }),
    ],
});
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(errorHandler_1.default);
app.use((0, morgan_1.default)('dev'));
app.use('/api/users', userRoutes_1.default);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api', exampelRoutes_1.default);
// Global felhanterare
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Något gick fel!');
});
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.get('/api/example', (req, res) => {
    res.json({ message: 'Hello, World!' });
});
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
exports.default = app;
