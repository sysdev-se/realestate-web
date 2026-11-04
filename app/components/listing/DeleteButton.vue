<template>
  <!-- Admins only; the session is browser-only, hence ClientOnly. -->
  <ClientOnly>
    <UModal v-if="$auth.isAdmin" v-model:open="open" title="Delete listing?" description="The listing and its uploaded images are deleted for good.">
      <UButton label="Delete listing" icon="i-lucide-trash-2" color="error" variant="soft" />

      <template #body>
        <UAlert v-if="error" color="error" variant="subtle" icon="i-lucide-circle-alert" :title="error" class="mb-4" />
        <div class="flex justify-end gap-2">
          <UButton label="Cancel" color="neutral" variant="ghost" @click="open = false" />
          <UButton label="Delete" color="error" :loading="deleting" @click="confirm" />
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>

<script lang="ts">
export default defineNuxtComponent({
  name: 'ListingDeleteButton',
  props: {
    listingId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      deleting: false,
      error: null as string | null,
    }
  },
  methods: {
    async confirm() {
      this.deleting = true
      this.error = null
      try {
        await this.$api.deleteListing(this.listingId)
        this.open = false
        await this.$router.push('/listings')
      }
      catch (error) {
        this.error = apiErrorMessage(error, 'Could not delete the listing, try again')
      }
      finally {
        this.deleting = false
      }
    },
  },
})
</script>
