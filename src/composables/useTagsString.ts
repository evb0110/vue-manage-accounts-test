import { computed } from 'vue'
import type { Ref } from 'vue'
import type { IAccount, ITag } from '@/types/account'

function parseTags(value: string): ITag[] {
    if (!value.trim()) return []

    return value
        .split(';')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => ({ text: tag }))
}

export const useTagsString = (account: Ref<IAccount>) => {
    return computed({
        get: () => account.value.tags.map(tag => tag.text).join('; '),
        set: (value: string) => {
            account.value.tags = parseTags(value)
        }
    })
}
