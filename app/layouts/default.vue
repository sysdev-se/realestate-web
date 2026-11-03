<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-default py-6">
      <UContainer class="flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted">
        <p>&copy; {{ currentYear }} Realestate. All rights reserved.</p>
        <nav class="flex gap-4">
          <NuxtLink to="/" class="hover:text-default">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-default">About</NuxtLink>
        </nav>
      </UContainer>
    </footer>
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'default',
  data() {
    return {
      currentYear: getCurrentYear(),
    }
  },
})
</script>

<style scoped>
</style>
