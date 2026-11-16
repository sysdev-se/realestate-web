<template>
  <UContainer class="py-8 max-w-2xl">
    <h1 class="text-2xl font-bold mb-6">Create listing</h1>

    <UForm :state="state" :validate="validate" class="space-y-5" @submit="submit">
      <UFormField label="Type" name="type" required>
        <URadioGroup v-model="state.type" :items="types" orientation="horizontal" />
      </UFormField>

      <UFormField label="Title" name="title" required>
        <UInput v-model="state.title" class="w-full" :maxlength="200" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" class="w-full" :rows="5" autoresize :maxlength="10000" />
      </UFormField>

      <UFormField :label="state.type === 'RENT' ? 'Rent per month (₫)' : 'Price (₫)'" name="price" required>
        <UInputNumber v-model="state.price" class="w-full sm:w-64" :min="0" :step="1000000" locale="vi-VN" :format-options="priceFormat" />
      </UFormField>

      <div class="grid gap-5 sm:grid-cols-3">
        <UFormField label="Bedrooms" name="bedrooms">
          <UInputNumber v-model="state.bedrooms" class="w-full" :min="0" :max="100" />
        </UFormField>
        <UFormField label="Bathrooms" name="bathrooms">
          <UInputNumber v-model="state.bathrooms" class="w-full" :min="0" :max="100" />
        </UFormField>
        <UFormField label="Area (m²)" name="areaSqm">
          <UInputNumber v-model="state.areaSqm" class="w-full" :min="0" :step="1" :format-options="areaFormat" />
        </UFormField>
      </div>

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
  type: ListingType
  title: string
  description: string
  price: number | undefined
  bedrooms: number | undefined
  bathrooms: number | undefined
  areaSqm: number | undefined
  imgUrls: string[]
}

export default defineNuxtComponent({
  name: 'ListingCreateForm',
  data() {
    return {
      state: {
        type: 'SALE',
        title: '',
        description: '',
        price: undefined,
        bedrooms: undefined,
        bathrooms: undefined,
        areaSqm: undefined,
        imgUrls: [],
      } as CreateListingState,
      types: [
        { label: 'For sale', value: 'SALE' },
        { label: 'For rent', value: 'RENT' },
      ] as { label: string, value: ListingType }[],
      // Whole VND.
      priceFormat: { maximumFractionDigits: 0 } as Intl.NumberFormatOptions,
      areaFormat: { maximumFractionDigits: 2 } as Intl.NumberFormatOptions,
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
          type: this.state.type,
          title: this.state.title.trim(),
          description: this.state.description.trim() || null,
          price: this.state.price ?? 0,
          bedrooms: this.state.bedrooms ?? null,
          bathrooms: this.state.bathrooms ?? null,
          areaSqm: this.state.areaSqm ?? null,
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
