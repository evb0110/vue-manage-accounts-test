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
import { ref } from 'vue'
import { useAccountsStore } from '@/stores/accountsStore.ts'
import { useTagsString } from '@/composables/useTagsString'
import { useValidators } from '@/composables/useValidators'
import type { IAccount } from '@/types/account'

interface IProps {
    account: IAccount
}

const props = defineProps<IProps>()
const store = useAccountsStore()

/*
  Такой подход нереактивен в отношении внешних изменений стора,
  но в ТЗ об этом ничего не было
 */
const localAccount = ref<IAccount>({ ...props.account })
const showPassword = ref(false)

const accountTypes = [
    { value: 'local', title: 'Локальная' },
    { value: 'ldap', title: 'LDAP' }
]

const tagsString = useTagsString(localAccount)
const { errors, validateLogin, validatePassword } = useValidators(localAccount)

/*
    Функции сохранения состояния логичнее было бы запускать по нажатию кнопки Save или
    хотя бы на blur, но поскольку в ТЗ такого нету, сделал real-time update
*/

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

</script>

<style scoped>
.delete-btn {
    margin-top: -4px;
    opacity: 0.8;
}
</style>
