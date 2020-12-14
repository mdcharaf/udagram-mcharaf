import express from 'express';
import { Router, Request, Response } from 'express-serve-static-core'

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send("<h2>Welcome to Filter Image Microservicec</h2>");
});

export default router;