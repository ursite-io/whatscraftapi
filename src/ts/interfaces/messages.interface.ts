import { Request } from 'express';
import { minecraftUserName, configuration, events } from '../types/messages.type';
import { WASocket } from '@whiskeysockets/baileys';

export interface WaSocketConnection {
    isConnected: boolean,
    socket?: WASocket
}

export interface Configuration {
    configuration: configuration
}

export interface EventsMessages {
    events: events
}

export interface WhatscraftLogger {
    info: Function,
    error: Function
}