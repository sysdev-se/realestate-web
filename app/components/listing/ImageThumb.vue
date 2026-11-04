<template>
  <div class="relative rounded-md overflow-hidden ring ring-default">
    <img :src="src" alt="" class="aspect-[4/3] w-full object-cover" :class="{ 'opacity-50': uploading }">

    <div v-if="uploading" class="absolute inset-0 flex items-center justify-center">
      <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin" />
    </div>

    <template v-else>
      <UBadge v-if="cover" label="Cover" class="absolute top-2 left-2" />
      <div class="absolute bottom-2 right-2 flex gap-1">
        <UButton v-if="!cover" icon="i-lucide-star" size="xs" color="neutral" aria-label="Make cover" title="Make cover" @click="$emit('make-cover')" />
        <UButton icon="i-lucide-trash-2" size="xs" color="error" aria-label="Remove image" title="Remove" @click="$emit('remove')" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'ListingImageThumb',
  props: {
    src: {
      type: String,
      required: true,
    },
    cover: {
      type: Boolean,
      default: false,
    },
    uploading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['make-cover', 'remove'],
})
</script>
