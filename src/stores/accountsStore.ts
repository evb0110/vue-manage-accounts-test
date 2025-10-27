import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import type { IAccount } from '@/types/account'

const Empty = {
    get account(): IAccount {
        return {
            uuid: uuidv4(),
            tags: [],
            type: 'local',
            login: '',
            password: ''
        }
    }
}

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = useLocalStorage<IAccount[]>('user-accounts', [])

    function addAccount() {
        accounts.value.push(Empty.account)
    }

    function updateAccount(uuid: IAccount['uuid'], updates: Partial<IAccount>) {
        accounts.value = accounts.value.map(account =>
            account.uuid === uuid ? { ...account, ...updates } : account
        )
    }

    function deleteAccount(uuid: IAccount['uuid']) {
        accounts.value = accounts.value.filter(account => account.uuid !== uuid)
    }

    return {
        accounts,
        addAccount,
        updateAccount,
        deleteAccount
    }
})
