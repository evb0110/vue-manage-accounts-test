export interface ITag {
    text: string
}

interface IAccountBase {
    uuid: string
    tags: ITag[]
    login: string
}

export interface IAccountLocal extends IAccountBase {
    type: 'local'
    password: string
}

export interface IAccountLDAP extends IAccountBase {
    type: 'ldap'
    password: null
}

export type IAccount = IAccountLocal | IAccountLDAP
