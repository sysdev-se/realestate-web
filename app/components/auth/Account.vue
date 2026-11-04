<template>
  <!-- The session lives in localStorage, so this part is rendered in the browser only. -->
  <ClientOnly>
    <AuthUserMenu v-if="$auth.signedIn" />
    <AuthSignInButton v-else :block="block" />
  </ClientOnly>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AuthAccount',
  props: {
    block: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
