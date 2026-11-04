<template>
  <ListingCreateForm />
</template>

<script lang="ts">
definePageMeta({ middleware: 'admin' })

export default defineNuxtComponent({
  name: 'CreateListingPage',
  head() {
    return { title: 'Create listing — Realestate' }
  },
})
</script>
