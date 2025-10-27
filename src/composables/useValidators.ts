import { ref } from 'vue'
import type { Ref } from 'vue'
import type { IAccount } from '@/types/account'

export const useValidators = (account: Ref<IAccount>) => {
    const errors = ref({
        login: false,
        password: false
    })

    function validateLogin() {
        const isValid = account.value.login.trim().length > 0
        errors.value.login = !isValid
        return isValid
    }

    function validatePassword() {
        if (account.value.type === 'ldap') {
            errors.value.password = false
            return true
        }

        const isValid = account.value.password !== null && account.value.password.trim().length > 0
        errors.value.password = !isValid
        return isValid
    }

    return {
        errors,
        validateLogin,
        validatePassword
    }
}
