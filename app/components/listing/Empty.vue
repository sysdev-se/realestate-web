<template>
  <UEmpty
    icon="i-lucide-building-2"
    :title="searched ? 'No listings match your search' : 'No listings yet'"
    :description="searched ? 'Try another title.' : 'Check back soon.'"
  />
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'ListingEmpty',
  props: {
    searched: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
