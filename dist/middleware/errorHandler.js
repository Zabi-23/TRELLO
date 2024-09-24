"use strict";
// middleware/errorHandler.js
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message });
};
exports.default = errorHandler;
