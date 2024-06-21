import express, { Express, Request, Response, Router } from "express";
import { getWhatsAppSocket } from "../controllers/whatsappController";
//import { MessageRequest } from "../ts/interfaces/messages.interface";
import { readJsonFile, replacePlaceholders, returnedUsersConnected } from "../util/utils";
import { userJoined } from "../ts/constants/constants";
interface MessageRequest extends Request {
    userName?: string
  }
const sendMessage = async (req: MessageRequest, res: Response) => {
    const conf  = await readJsonFile('./config.json');
    const userName = req.body?.userName;
    const usersConnected = req.body?.playerList;
    const strUsers = returnedUsersConnected(usersConnected);
    const strUserConnected = strUsers.length > 0 ? 'Usuarios conectados:\n'+strUsers : '';
    let data = {
        success: true,
        code: 200
    };
    try{
        const { socket } = getWhatsAppSocket();
        const txtToSend = replacePlaceholders(userJoined, [userName, strUserConnected]);
        socket.sendMessage(conf.configuration.group.id, { text: txtToSend });
    }catch(e){
        data.success = false;
        data.code = 400;
        res.status(400).json(data);
    }
    
    res.status(200).json(data);
}
export default {sendMessage}