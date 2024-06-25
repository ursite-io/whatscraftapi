import { promises as fs } from 'fs';
import { Configuration } from '../ts/interfaces/messages.interface';
import { whatscraftLogger } from './logger';
export const replacePlaceholders = (template:string, values: Array<any>) => {
    return template.replace(/\$(\d+)/g, (match, number) => {
        return typeof values[number - 1] !== 'undefined' ? values[number - 1] : match;
    });
}
export async function readJsonFile(filePath: string): Promise<Configuration> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

// Escribir en un archivo JSON
export async function writeJsonFile(filePath: string, data: Configuration): Promise<void> {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');
}

export const validateGroupFound = (group: any, groupName:string) => {
    if(group.length == 0){
        throw new Error(`No group founded with name: ${groupName}`);
    }
}

export const returnedUsersConnected = (userList: Array<String>): string => {
    let strList:string = '';
    userList.map((player, i)=>{
        strList = strList+`* ${player}${userList.length === i+1 ? '' : `\n`}`
    })
    whatscraftLogger.info('User List:', userList);
    return strList;
}