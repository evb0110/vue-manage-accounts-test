export interface ITag {
    text: string
}

export type TAccountType = 'local' | 'ldap'

export interface IAccount {
    id: string
    tags: ITag[]
    type: TAccountType
    login: string
    password: string | null
}
