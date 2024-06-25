export type minecraftUserName = string

export type configuration = {
    adminNumbers: Array<string>,
    group: {
        name: string,
        id?: string
    }

}
export type events = {
    userJoined: {
        userConnected: string,
        playersList: string
    }
}