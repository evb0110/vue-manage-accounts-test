<template>
    <v-row class="mb-2">
        <v-col cols="12" sm="3" class="py-0">
            <v-text-field
                v-model="tagsString"
                placeholder="XXX; YYY; ZZZ"
                density="compact"
                variant="outlined"
                maxlength="50"
                @input="handleTagsInput"
            />
        </v-col>
        <v-col cols="12" sm="2" class="py-0">
            <v-select
                v-model="localAccount.type"
                :items="accountTypes"
                density="compact"
                variant="outlined"
                @update:model-value="handleTypeChange"
            />
        </v-col>
        <v-col cols="12" :sm="localAccount.type === 'ldap' ? 6 : 3" class="py-0">
            <v-text-field
                v-model="localAccount.login"
                placeholder="Значение"
                density="compact"
                variant="outlined"
                maxlength="100"
                :error="errors.login"
                @input="handleLoginInput"
            />
        </v-col>
        <v-col v-if="localAccount.type === 'local'" cols="12" sm="3" class="py-0">
            <v-text-field
                v-model="localAccount.password"
                :type="showPassword ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                maxlength="100"
                :error="errors.password"
                @input="handlePasswordInput"
            >
                <template #append-inner>
                    <v-icon
                        @click="showPassword = !showPassword"
                        style="cursor: pointer"
                    >
                        {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                    </v-icon>
                </template>
            </v-text-field>
        </v-col>
        <v-col cols="12" sm="1" class="py-0">
            <v-btn
                icon
                variant="text"
                color="grey-darken-1"
                class="delete-btn"
                @click="handleDelete"
            >
                <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAccountsStore } from '@/stores/accounts'
import type { IAccount, ITag } from '@/types/account'

interface IProps {
    account: IAccount
}

const props = defineProps<IProps>()
const store = useAccountsStore()

const localAccount = ref<IAccount>({ ...props.account })
const showPassword = ref(false)
const errors = ref({
    login: false,
    password: false
})

const accountTypes = [
    { value: 'local', title: 'Локальная' },
    { value: 'ldap', title: 'LDAP' }
]

const tagsString = computed({
    get: () => localAccount.value.tags.map(tag => tag.text).join('; '),
    set: (value: string) => {
        localAccount.value.tags = parseTags(value)
    }
})

function parseTags(value: string): ITag[] {
    if (!value.trim()) return []

    return value
        .split(';')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => ({ text: tag }))
}

function validateLogin() {
    const isValid = localAccount.value.login.trim().length > 0
    errors.value.login = !isValid
    return isValid
}

function validatePassword() {
    if (localAccount.value.type === 'ldap') {
        errors.value.password = false
        return true
    }

    const isValid = localAccount.value.password !== null && localAccount.value.password.trim().length > 0
    errors.value.password = !isValid
    return isValid
}

function handleTagsInput() {
    store.updateAccount(localAccount.value.uuid, {
        tags: localAccount.value.tags
    })
}

function handleTypeChange() {
    if (localAccount.value.type === 'ldap') {
        localAccount.value.password = null
        errors.value.password = false
    } else {
        localAccount.value.password = ''
    }

    store.updateAccount(localAccount.value.uuid, {
        type: localAccount.value.type,
        password: localAccount.value.password
    })
}

function handleLoginInput() {
    validateLogin()
    store.updateAccount(localAccount.value.uuid, {
        login: localAccount.value.login
    })
}

function handlePasswordInput() {
    validatePassword()
    store.updateAccount(localAccount.value.uuid, {
        password: localAccount.value.password
    })
}

function handleDelete() {
    store.deleteAccount(localAccount.value.uuid)
}

watch(() => props.account, (newAccount) => {
    localAccount.value = { ...newAccount }
}, { deep: true })
</script>

<style scoped>
.delete-btn {
    margin-top: -4px;
    opacity: 0.8;
}
</style>
