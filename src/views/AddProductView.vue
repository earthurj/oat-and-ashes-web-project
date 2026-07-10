<template>
  <div class="max-w-2xl mx-auto px-4 py-12">
    <router-link to="/products" class="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-espresso/40 hover:text-espresso mb-8 transition-colors">
      ← Back to Shop
    </router-link>

    <div class="mb-8">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Products</span>
      <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">Add New Product</h1>
    </div>

    <div v-if="error" class="bg-[#FDF2F2] border-2 border-red-800 p-3 font-mono text-xs text-red-800 mb-6">
      {{ error }}
    </div>

    <div class="card bg-cream">
      <ProductForm :saving="saving" @submit="handleAdd" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ProductForm from '@/components/ProductForm.vue'

const store = useStore()
const router = useRouter()

const saving = computed(() => store.state.products.loading)
const error = computed(() => store.state.products.error)

async function handleAdd(formData) {
  try {
    await store.dispatch('products/addProduct', {
      ...formData,
      createdAt: new Date().toISOString()
    })
    router.push('/products')
  } catch {
    // Handled by store
  }
}
</script>
