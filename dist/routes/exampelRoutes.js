"use strict";
// src/routes/exampleRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/example', (req, res) => {
    res.status(200).json({ message: 'Hello, World!' });
});
exports.default = router;
