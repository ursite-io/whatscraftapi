import { Boom } from '@hapi/boom'
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
interface WaSocketConnection {
    isConnected: boolean,
    socket: any
}

let socket: WaSocketConnection = {
    isConnected: false,
    socket: null
};
export async function connectWhatsAppSocket(): Promise<WaSocketConnection> {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update: any) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            if (shouldReconnect) {
                connectWhatsAppSocket();
            }
        } else if (connection === 'open') {
            socket.isConnected = true;
            socket.socket = sock;
            console.log('opened connection');
            sock.sendMessage('5214431300718@s.whatsapp.net', { text: "Conectao" });
        }
    });

    return socket;
}
export const getWhatsAppSocket =  (): any=> {    
    if (!socket.isConnected) {
        throw new Error('WhatsApp socket not connected');
    }
    return socket;
};