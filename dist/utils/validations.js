"use strict";
//validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateTask = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateTask = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('status').isIn(['to-do', 'in progress', 'blocked', 'done']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
