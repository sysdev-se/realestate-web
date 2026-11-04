<template>
  <div v-if="total > pageSize" class="flex justify-center">
    <UPagination :page="page" :total="total" :items-per-page="pageSize" @update:page="(value: number) => $emit('change', value)" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'ListingPagination',
  props: {
    page: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  emits: {
    change: (_page: number) => true,
  },
  data() {
    return {
      pageSize: LISTING_PAGE_SIZE,
    }
  },
})
</script>
