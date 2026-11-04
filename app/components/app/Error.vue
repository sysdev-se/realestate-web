<template>
  <UContainer class="py-16">
    <UEmpty
      icon="i-lucide-circle-alert"
      :title="error.statusCode === 404 ? 'Page not found' : 'Something went wrong'"
      :description="error.statusMessage || error.message"
      :actions="actions"
    />
  </UContainer>
</template>

<script lang="ts">
import type { NuxtError } from '#app'
import type { ButtonProps } from '@nuxt/ui'
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'AppError',
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true,
    },
  },
  data() {
    return {
      actions: [
        { label: 'All listings', icon: 'i-lucide-arrow-left', onClick: () => clearError({ redirect: '/listings' }) },
      ] as ButtonProps[],
    }
  },
})
</script>
