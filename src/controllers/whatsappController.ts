import { Boom } from '@hapi/boom'
import { WaSocketConnection } from '../ts/interfaces/messages.interface';
import { Chat } from '@whiskeysockets/baileys/lib/Types/Chat';
import { readJsonFile } from '../util/utils';
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, baileys } = require('@whiskeysockets/baileys');

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
            getGroupInfo(socket);
            //sock.sendMessage('5214431300718@s.whatsapp.net', { text: "Conectao" });
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
const getGroupInfo = async (sock:WaSocketConnection) => {
    const { configuration } = await readJsonFile('./config.json');
    const chats =  await sock.socket.groupFetchAllParticipating();
    const groups = Object.values(chats).filter((chat:any) => chat?.subject); // Filtrar solo los grupos
    const group = groups.filter((x:any) =>x.subject === configuration.group.name);
    console.log('------------------------------------------------\n',group);
}