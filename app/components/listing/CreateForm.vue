<template>
  <UContainer class="py-8 max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">Create listing</h1>

    <UForm :state="state" :validate="validate" class="space-y-5" @submit="submit">
      <UFormField label="Title" name="title" required>
        <UInput v-model="state.title" class="w-full" :maxlength="200" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" class="w-full" :rows="5" autoresize :maxlength="10000" />
      </UFormField>

      <UFormField label="Price (SEK)" name="price" required>
        <UInputNumber v-model="state.price" class="w-full sm:w-64" :min="0" :step="10000" locale="sv-SE" :format-options="priceFormat" />
      </UFormField>

      <UFormField label="Images" name="imgUrls" description="The first image is the cover.">
        <ListingImageUploader v-model="state.imgUrls" @busy="(value: boolean) => uploading = value" />
      </UFormField>

      <UAlert v-if="error" color="error" variant="subtle" icon="i-lucide-circle-alert" :title="error" />

      <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <UButton to="/listings" label="Cancel" color="neutral" variant="ghost" class="justify-center" />
        <UButton type="submit" label="Create listing" :loading="submitting" :disabled="uploading" class="justify-center" />
      </div>
    </UForm>
  </UContainer>
</template>

<script lang="ts">
import type { FormError } from '@nuxt/ui'

interface CreateListingState {
  title: string
  description: string
  price: number | undefined
  imgUrls: string[]
}

export default defineNuxtComponent({
  name: 'ListingCreateForm',
  data() {
    return {
      state: { title: '', description: '', price: undefined, imgUrls: [] } as CreateListingState,
      priceFormat: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions,
      uploading: false,
      submitting: false,
      error: null as string | null,
    }
  },
  methods: {
    validate(state: Partial<CreateListingState>): FormError[] {
      const errors: FormError[] = []
      if (!state.title?.trim()) {
        errors.push({ name: 'title', message: 'Enter a title' })
      }
      if (state.price === undefined || state.price === null || state.price < 0) {
        errors.push({ name: 'price', message: 'Enter a price' })
      }
      return errors
    },
    async submit() {
      this.submitting = true
      this.error = null
      try {
        const listing = await this.$api.createListing({
          title: this.state.title.trim(),
          description: this.state.description.trim() || null,
          price: this.state.price ?? 0,
          imgUrls: this.state.imgUrls,
        })
        await this.$router.push(`/listings/${listing.id}`)
      }
      catch (error) {
        this.error = apiErrorMessage(error, 'Could not create the listing, try again')
      }
      finally {
        this.submitting = false
      }
    },
  },
})
</script>
