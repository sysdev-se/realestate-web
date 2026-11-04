<template>
  <UApp>
    <NuxtLayout :name="$deviceLayout.current">
      <AppError :error="error" />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts">
import type { NuxtError } from '#app'
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ErrorPage',
  props: {
    error: {
      type: Object as PropType<NuxtError>,
      required: true,
    },
  },
})
</script>
