<template>
  <UFooter>
    <template #left>
      <p class="text-sm text-muted">&copy; {{ year }} Realestate. All rights reserved.</p>
    </template>
  </UFooter>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AppFooter',
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
})
</script>
