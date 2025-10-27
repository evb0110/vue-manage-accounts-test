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
    /*
        Сейчас сохранение в localStorage идёт на каждом нажатии клавиши, в прод такое пускать нельзя, но в ТЗ нет кнопки сохранения
    */
    const accounts = useLocalStorage<IAccount[]>('user-accounts', [])

    function addAccount() {
        accounts.value.push(Empty.account)
    }

    function updateAccount(updatedAccount: IAccount) {
        accounts.value = accounts.value.map(account =>
            account.uuid === updatedAccount.uuid ? updatedAccount : account
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
