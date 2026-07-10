<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="font-display text-3xl font-bold uppercase tracking-[0.15em] text-espresso mb-2">Join the Roastery</h1>
        <p class="font-mono text-xs uppercase tracking-wider text-espresso/50">Create your account</p>
      </div>

      <!-- Form card -->
      <div class="card bg-cream">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Error -->
          <div v-if="error" class="bg-[#FDF2F2] border-2 border-red-800 p-3 font-mono text-xs text-red-800">
            {{ error }}
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Name</label>
            <input v-model="name" type="text" required class="input-field" placeholder="Your full name" autocomplete="name" />
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Email</label>
            <input v-model="email" type="email" required class="input-field" placeholder="you@email.com" autocomplete="email" />
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Password</label>
            <input v-model="password" type="password" required class="input-field" placeholder="Min. 6 characters" autocomplete="new-password" minlength="6" />
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Confirm Password</label>
            <input v-model="confirmPassword" type="password" required class="input-field" :class="{ 'border-red-800 bg-[#FDF2F2]': passwordMismatch }" placeholder="Type again" autocomplete="new-password" />
            <p v-if="passwordMismatch" class="font-mono text-[10px] text-red-800 mt-1">Passwords don't match</p>
          </div>

          <button type="submit" :disabled="loading || passwordMismatch" class="btn-primary w-full text-center flex justify-center">
            <span v-if="!loading">Create Account</span>
            <span v-else class="inline-flex gap-1">
              <span class="w-1.5 h-1.5 bg-cream animate-pulse"></span>
              <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 150ms"></span>
              <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 300ms"></span>
            </span>
          </button>
        </form>

        <div class="mt-6 pt-4 border-t-2 border-espresso/20 text-center">
          <p class="font-mono text-xs text-espresso/50">
            Already have an account?
            <router-link to="/login" class="text-espresso underline underline-offset-2 hover:text-espresso/70">Sign in</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const loading = computed(() => store.state.auth.loading)
const error = computed(() => store.state.auth.error)
const passwordMismatch = computed(() => confirmPassword.value && password.value !== confirmPassword.value)

async function handleRegister() {
  if (passwordMismatch.value) return
  try {
    await store.dispatch('auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch {
    // Error handled by store
  }
}
</script>
