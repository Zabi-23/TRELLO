


// src/routes/exampleRoutes.ts

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/example', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, World!' });
});

export default router;



