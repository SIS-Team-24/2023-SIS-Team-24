import express, { Request, Response } from "express";
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('⚡️⚡️⚡️ Express + TypeScript Server! ⚡️⚡️⚡️');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});