import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'
import type { IAccount } from '@/types/account'

export const useAccountsStore = defineStore('accounts', () => {
    const accounts = useLocalStorage<IAccount[]>('user-accounts', [])

    function addAccount() {
        const newAccount: IAccount = {
            uuid: uuidv4(),
            tags: [],
            type: 'local',
            login: '',
            password: ''
        }
        accounts.value.push(newAccount)
    }

    function updateAccount(uuid: string, updates: Partial<IAccount>) {
        accounts.value = accounts.value.map(account =>
            account.uuid === uuid ? { ...account, ...updates } : account
        )
    }

    function deleteAccount(uuid: string) {
        accounts.value = accounts.value.filter(account => account.uuid !== uuid)
    }

    return {
        accounts,
        addAccount,
        updateAccount,
        deleteAccount
    }
})
