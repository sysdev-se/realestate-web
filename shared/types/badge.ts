import type { BadgeProps } from '@nuxt/ui'

export type BadgeColor = NonNullable<BadgeProps['color']>

export interface Badge {
    label: string
    color: BadgeColor
}