import express, { Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config({path:'../.env'});

const app = express();

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.get('/api', (req: Request, res: Response) => {
  res.send('⚡️⚡️⚡️ Express + TypeScript Server! ⚡️⚡️⚡️');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});