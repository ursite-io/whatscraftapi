import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import API_SEND_MESSAGE from "./routes/sendMessage";
import { connectWhatsAppSocket } from "./controllers/whatsappController";
import { RUTA, URL_NODE, port } from "./ts/constants/constants";
import { whatscraftLogger } from "./util/logger";
dotenv.config();
const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
connectWhatsAppSocket();
app.use(`${RUTA}/sendMessage`, API_SEND_MESSAGE);
app.listen(port, () => {
  whatscraftLogger.info(`[server]: Server is running at ${URL_NODE}`);
  whatscraftLogger.info(`[services]: ${URL_NODE+RUTA}/sendMessage`)
});