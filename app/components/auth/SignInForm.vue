<template>
  <UForm :state="state" :validate="validate" class="space-y-4" @submit="submit">
    <UFormField label="Email" name="email" required>
      <UInput v-model="state.email" type="email" autocomplete="username" class="w-full" autofocus />
    </UFormField>

    <UFormField label="Password" name="password" required>
      <UInput v-model="state.password" type="password" autocomplete="current-password" class="w-full" />
    </UFormField>

    <UAlert v-if="error" color="error" variant="subtle" icon="i-lucide-circle-alert" :title="error" />

    <UButton type="submit" label="Sign in" :loading="submitting" block />
  </UForm>
</template>

<script lang="ts">
import type { FormError } from '@nuxt/ui'

interface SignInState {
  email: string
  password: string
}

export default defineNuxtComponent({
  name: 'AuthSignInForm',
  emits: ['signed-in'],
  data() {
    return {
      state: { email: '', password: '' } as SignInState,
      submitting: false,
      error: null as string | null,
    }
  },
  methods: {
    validate(state: Partial<SignInState>): FormError[] {
      const errors: FormError[] = []
      if (!state.email) {
        errors.push({ name: 'email', message: 'Enter your email' })
      }
      if (!state.password) {
        errors.push({ name: 'password', message: 'Enter your password' })
      }
      return errors
    },
    async submit() {
      this.submitting = true
      this.error = null
      try {
        await this.$auth.signIn(this.state.email, this.state.password)
        this.$emit('signed-in')
      }
      catch (error) {
        this.error = apiErrorStatus(error) === 401
          ? 'Wrong email or password'
          : apiErrorMessage(error, 'Could not sign in, try again')
      }
      finally {
        this.submitting = false
      }
    },
  },
})
</script>
