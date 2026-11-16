<template>
  <div>
    <HomeHero />
    <HomeIntro />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'HomePage',
  head() {
    return {
      title: 'Realestate — Houses and apartments for sale and rent',
      meta: [
        { name: 'description', content: 'Browse houses and apartments for sale and rent from real estate agencies in one place.' },
      ],
    }
  },
})
</script>
