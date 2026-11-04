<template>
  <img v-if="src && !failed" :src="src" :alt="alt" class="w-full object-cover bg-elevated" loading="lazy" @error="failed = true">
  <div v-else class="w-full flex items-center justify-center bg-elevated text-dimmed" role="img" :aria-label="alt">
    <UIcon name="i-lucide-image-off" class="size-10" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

// A listing image, or a placeholder when there is none or it's gone (demo images are deleted
// from the bucket after about a day).
export default defineNuxtComponent({
  name: 'ListingImage',
  props: {
    src: {
      type: String as PropType<string | null>,
      default: null,
    },
    alt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      failed: false,
    }
  },
})
</script>
