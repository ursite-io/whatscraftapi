import { log } from "console"
import { WhatscraftLogger } from "../ts/interfaces/messages.interface"
import { loggerInfo, loggerError } from "../ts/constants/constants";

const info = (message: any,...rest: Array<any>) => {
    message = message || '';
    log(loggerInfo,message, ...rest);
}
const error = (message:any, ...rest: Array<any>) => {
    message = message || '';
    log(loggerError,message, ...rest);
}

export const whatscraftLogger: WhatscraftLogger = {
    info,
    error,
}