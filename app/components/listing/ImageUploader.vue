<template>
  <div class="space-y-4">
    <UFileUpload
      v-model="picked"
      multiple
      accept="image/jpeg,image/png,image/webp"
      label="Drop images here or click to choose"
      description="JPEG, PNG or WebP, up to 10 MB each"
      :preview="false"
      class="w-full min-h-32"
    />

    <UAlert v-for="failure in failures" :key="failure" color="error" variant="subtle" icon="i-lucide-circle-alert" :title="failure" />

    <ul v-if="modelValue.length > 0 || pending.length > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <li v-for="(url, index) in modelValue" :key="url">
        <ListingImageThumb :src="url" :cover="index === 0" @make-cover="makeCover(index)" @remove="remove(index)" />
      </li>
      <li v-for="upload in pending" :key="upload.id">
        <ListingImageThumb :src="upload.preview" uploading />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

interface PendingUpload {
  id: number
  preview: string
}

const MAX_BYTES = 10 * 1024 * 1024

// Uploads each picked image right away and keeps the resulting URLs (v-model), in order: the
// first one is the listing's cover. Removed images stay in the bucket until it expires them.
export default defineNuxtComponent({
  name: 'ListingImageUploader',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  emits: {
    'update:modelValue': (_urls: string[]) => true,
    'busy': (_busy: boolean) => true,
  },
  data() {
    return {
      picked: [] as File[] | null,
      pending: [] as PendingUpload[],
      failures: [] as string[],
      nextId: 0,
    }
  },
  watch: {
    picked(files: File[] | null) {
      if (files && files.length > 0) {
        this.picked = []
        this.failures = []
        this.uploadAll(files)
      }
    },
    pending(uploads: PendingUpload[]) {
      this.$emit('busy', uploads.length > 0)
    },
  },
  methods: {
    async uploadAll(files: File[]) {
      // One at a time, so the images keep the order they were picked in.
      for (const file of files) {
        if (file.size > MAX_BYTES) {
          this.failures.push(`${file.name} is larger than 10 MB`)
          continue
        }
        const upload = { id: this.nextId++, preview: URL.createObjectURL(file) }
        this.pending = [...this.pending, upload]
        try {
          const { url } = await this.$api.uploadImage(file)
          this.$emit('update:modelValue', [...this.modelValue, url])
        }
        catch (error) {
          this.failures.push(`${file.name}: ${apiErrorMessage(error, 'upload failed')}`)
        }
        finally {
          this.pending = this.pending.filter((other) => other.id !== upload.id)
          URL.revokeObjectURL(upload.preview)
        }
      }
    },
    makeCover(index: number) {
      const urls = [...this.modelValue]
      const [cover] = urls.splice(index, 1)
      this.$emit('update:modelValue', [cover!, ...urls])
    },
    remove(index: number) {
      this.$emit('update:modelValue', this.modelValue.filter((_url, other) => other !== index))
    },
  },
})
</script>
