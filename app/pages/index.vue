<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 p-8">
    <UCard class="max-w-md w-full">
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-house" class="text-primary size-6" />
          <h2 class="text-xl font-bold">{{ title }}</h2>
        </div>
      </template>

      <p class="text-muted mb-4">{{ description }}</p>

      <div class="flex flex-wrap gap-2 mb-4">
        <UBadge
            v-for="badge in badges"
            :key="badge.label"
            :label="badge.label"
            :color="badge.color"
            variant="subtle"
        />
      </div>

      <template #footer>
        <div class="flex gap-2">
          <UButton
              label="Learn more"
              variant="outline"
              color="neutral"
              size="lg"
              to="/about"
          />
        </div>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'index',
  data() {
    return {
      title: 'Realestate',
      description: 'Houses and apartments for sale, collected from real estate agencies in one place.',
      badges: [
        { label: 'Houses', color: 'primary' },
        { label: 'Apartments', color: 'success' },
      ] as Badge[],
    }
  },
  head() {
    return {
      title: 'Realestate — Houses and apartments for sale',
      meta: [
        {
          name: 'description',
          content: 'Browse houses and apartments for sale from real estate agencies in one place.',
        },
      ],
    }
  },
})
</script>

<style scoped>
</style>
