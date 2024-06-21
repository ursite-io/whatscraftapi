import {minecraftUserName} from '../types/messages.type';
import { Request, Express } from "express"
declare namespace Express {
    export interface Request {
        userName?: minecraftUserName;
    }
  }
