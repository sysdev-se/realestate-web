<template>
  <UCarousel
    v-if="images.length > 1"
    v-slot="{ item, index }"
    :items="images"
    arrows
    dots
    loop
    class="rounded-lg overflow-hidden"
  >
    <ListingImage :src="item" :alt="`${title}, image ${index + 1}`" class="aspect-[4/3] rounded-lg" />
  </UCarousel>
  <ListingImage v-else :src="images[0] ?? null" :alt="title" class="aspect-[4/3] rounded-lg" />
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingGallery',
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
