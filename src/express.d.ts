

// src/types/express.d.ts

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { // Använd en mer specifik typ om du har en användartyp
        id: string;
        // Lägg till fler användarfält här om du har dem
      };
    }
  }
}
