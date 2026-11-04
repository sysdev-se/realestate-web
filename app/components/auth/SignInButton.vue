<template>
  <UModal v-model:open="open" title="Sign in" description="Admins only, for now.">
    <UButton label="Sign in" icon="i-lucide-log-in" color="neutral" variant="outline" :block="block" />

    <template #body>
      <AuthSignInForm @signed-in="open = false" />
    </template>
  </UModal>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AuthSignInButton',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },
})
</script>
