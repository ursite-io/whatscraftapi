import { Request } from 'express';
import { minecraftUserName, configuration } from '../types/messages.type';

export interface WaSocketConnection {
    isConnected: boolean,
    socket: any
}

export interface Configuration {
    configuration: configuration
}
