<template>
  <UButton :to="to" :label="label" icon="i-lucide-arrow-left" color="neutral" variant="link" class="px-0" />
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'ListingBackLink',
  props: {
    to: {
      type: String,
      default: '/listings',
    },
    label: {
      type: String,
      default: 'All listings',
    },
  },
})
</script>
