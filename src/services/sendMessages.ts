import express, { Express, Request, Response, Router } from "express";
const sendMessage = (req: Request, res: Response) => {
    const data = {hola:"Mundo"};
    res.status(200).json(data);
}
export default {sendMessage}