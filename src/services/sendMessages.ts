import express, { Express, Request, Response, Router } from "express";
import { getWhatsAppSocket } from "../controllers/whatsappController";
//import { MessageRequest } from "../ts/interfaces/messages.interface";
import { replacePlaceholders } from "../util/utils";
import { userJoined } from "../ts/constants/constants";
interface MessageRequest extends Request {
    userName?: string
  }
const sendMessage = (req: MessageRequest, res: Response) => {
    const userName = req.body?.userName;
    let data = {
        success: true,
        code: 200
    };
    try{
        const { socket } = getWhatsAppSocket();
        const txtToSend = replacePlaceholders(userJoined, [userName, '- Es Admin'])
        socket.sendMessage('5214431300718@s.whatsapp.net', { text: txtToSend });
    }catch(e){
        data.success = false;
        data.code = 400;
        res.status(400).json(data);
    }
    
    res.status(200).json(data);
}
export default {sendMessage}