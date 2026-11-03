<template>
  <UContainer class="py-16">
    <h1 class="text-3xl font-bold mb-4">{{ heading }}</h1>
    <p class="text-muted mb-6">{{ intro }}</p>

    <ul class="space-y-3">
      <li v-for="point in points" :key="point" class="flex items-start gap-2">
        <UIcon name="i-lucide-check" class="text-primary mt-1 shrink-0" />
        <span>{{ point }}</span>
      </li>
    </ul>

    <UButton
        label="Back to home"
        variant="outline"
        color="neutral"
        class="mt-8"
        to="/"
    />
  </UContainer>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'about',
  data() {
    return {
      heading: 'About Realestate',
      intro: 'Realestate collects listings from real estate agencies so you can browse them in one place.',
      points: [
        'Houses and apartments from many agencies',
        'Listings updated on a schedule',
        'Free to browse',
      ],
    }
  },
  head() {
    return {
      title: 'About Realestate',
      meta: [
        { name: 'description', content: 'Learn about Realestate, a listing site for houses and apartments.' },
      ],
    }
  },
})
</script>

<style scoped>
</style>
