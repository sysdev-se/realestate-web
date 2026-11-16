<template>
  <div class="rounded-md ring ring-default p-3 space-y-1">
    <p class="text-sm text-muted">Found on {{ source }}</p>
    <ULink :to="url" target="_blank" rel="noopener noreferrer" class="inline-flex items-start gap-1 break-all text-sm text-primary hover:underline">
      <span>{{ url }}</span>
      <UIcon name="i-lucide-external-link" class="size-4 shrink-0 mt-0.5" />
    </ULink>
  </div>
</template>

<script lang="ts">
// The listing's page on the site a scraper found it on, written out in full so the admin can
// check it before approving or rejecting.
export default defineNuxtComponent({
  name: 'ListingSourceLink',
  props: {
    source: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
})
</script>
