<template>
    <v-container class="accounts-container">
        <AccountsHeader />

        <v-row v-if="store.accounts.length > 0" class="mt-8">
            <v-col cols="12" sm="3">
                <div class="text-body-2 text-medium-emphasis">Метки</div>
            </v-col>
            <v-col cols="12" sm="2">
                <div class="text-body-2 text-medium-emphasis">Тип записи</div>
            </v-col>
            <v-col cols="12" sm="3">
                <div class="text-body-2 text-medium-emphasis">Логин</div>
            </v-col>
            <v-col cols="12" sm="3">
                <div class="text-body-2 text-medium-emphasis">Пароль</div>
            </v-col>
            <v-col cols="12" sm="1">
            </v-col>
        </v-row>

        <AccountItem
            v-for="account in store.accounts"
            :key="account.uuid"
            :account="account"
        />
    </v-container>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accountsStore.ts'
import AccountsHeader from './AccountsHeader.vue'
import AccountItem from './AccountItem.vue'

const store = useAccountsStore()
</script>

<style scoped>
.accounts-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
