import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import API_SEND_MESSAGE from "./routes/sendMessage";
dotenv.config();
const RUTA = "/dev/whatscraft"
const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use(`${RUTA}/sendMessage`, API_SEND_MESSAGE);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});