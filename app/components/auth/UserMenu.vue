<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-muted truncate max-w-48 sm:max-w-none">{{ $auth.username }}</span>
    <UButton label="Sign out" icon="i-lucide-log-out" color="neutral" variant="ghost" @click="signOut" />
  </div>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'AuthUserMenu',
  methods: {
    signOut() {
      this.$auth.signOut()
      if (this.$route.path.startsWith('/admin')) {
        this.$router.push('/')
      }
    },
  },
})
</script>
