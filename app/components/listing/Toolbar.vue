<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <form class="flex flex-1 gap-2" role="search" @submit.prevent="$emit('change', { title: search.trim() })">
      <UInput v-model="search" icon="i-lucide-search" placeholder="Search by title" class="flex-1" aria-label="Search by title" />
      <UButton type="submit" label="Search" color="neutral" variant="outline" />
    </form>
    <USelect
      :model-value="sort"
      :items="sorts"
      class="w-full sm:w-52"
      aria-label="Sort"
      @update:model-value="(value) => $emit('change', { sort: value as ListingSort })"
    />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default defineNuxtComponent({
  name: 'ListingToolbar',
  props: {
    title: {
      type: String,
      required: true,
    },
    sort: {
      type: String as PropType<ListingSort>,
      required: true,
    },
  },
  emits: {
    change: (_changes: Partial<ListingQuery>) => true,
  },
  data() {
    return {
      search: this.title,
      sorts: LISTING_SORTS,
    }
  },
})
</script>
