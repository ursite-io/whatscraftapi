import express, { Express, Request, Response, Router } from "express";
import { getWhatsAppSocket } from "../controllers/whatsappController";
const sendMessage = (req: Request, res: Response) => {
    const data = {hola:"Mundo"};
    const {socket} = getWhatsAppSocket();
    socket.sendMessage('5214431300718@s.whatsapp.net', { text: "Saludos desde el API" });
    res.status(200).json(data);
}
export default {sendMessage}