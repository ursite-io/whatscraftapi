import { Request } from 'express';
import { minecraftUserName, configuration } from '../types/messages.type';
import { WASocket } from '@whiskeysockets/baileys';

export interface WaSocketConnection {
    isConnected: boolean,
    socket?: WASocket
}

export interface Configuration {
    configuration: configuration
}

export interface WhatscraftLogger {
    info: Function,
    error: Function
}