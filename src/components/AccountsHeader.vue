<template>
    <div class="mt-10">
        <v-row align="center" class="mb-4">
            <v-col cols="auto">
                <h2 class="text-h5">Учетные записи</h2>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    variant="outlined"
                    size="large"
                    @click="handleAdd"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert
                    type="info"
                    variant="tonal"
                    density="compact"
                    class="mb-4 mr-8"
                >
                    <span class="text-body-1">
                        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
                    </span>
                </v-alert>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'

const store = useAccountsStore()

function handleAdd() {
    store.addAccount()
}
</script>

<style scoped>
</style>
