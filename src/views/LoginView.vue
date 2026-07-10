<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="font-display text-3xl font-bold uppercase tracking-[0.15em] text-espresso mb-2">Welcome Back</h1>
        <p class="font-mono text-xs uppercase tracking-wider text-espresso/50">Sign in to your account</p>
      </div>

      <!-- Form card -->
      <div class="card bg-cream">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Error -->
          <div v-if="error" class="bg-[#FDF2F2] border-2 border-red-800 p-3 font-mono text-xs text-red-800">
            {{ error }}
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Email</label>
            <input v-model="email" type="email" required class="input-field" placeholder="you@email.com" autocomplete="email" />
          </div>

          <div>
            <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Password</label>
            <input v-model="password" type="password" required class="input-field" placeholder="••••••••" autocomplete="current-password" />
          </div>

          <button type="submit" :disabled="loading" class="btn-primary w-full text-center flex justify-center">
            <span v-if="!loading">Sign In</span>
            <span v-else class="inline-flex gap-1">
              <span class="w-1.5 h-1.5 bg-cream animate-pulse"></span>
              <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 150ms"></span>
              <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 300ms"></span>
            </span>
          </button>
        </form>

        <div class="mt-6 pt-4 border-t-2 border-espresso/20 text-center">
          <p class="font-mono text-xs text-espresso/50">
            Don't have an account?
            <router-link to="/register" class="text-espresso underline underline-offset-2 hover:text-espresso/70">Create one</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const loading = computed(() => store.state.auth.loading)
const error = computed(() => store.state.auth.error)

async function handleLogin() {
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value })
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch {
    // Error is handled by the store
  }
}
</script>
