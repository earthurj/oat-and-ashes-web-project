<template>
  <div class="max-w-2xl mx-auto px-4 py-12">
    <template v-if="items.length === 0 && !confirmed">
      <!-- Empty cart redirect -->
      <div class="card text-center py-16">
        <p class="font-mono text-xs uppercase tracking-wider text-espresso/40 mb-2">No order to confirm</p>
        <router-link to="/products" class="btn-primary inline-block mt-4">Browse Products</router-link>
      </div>
    </template>

    <template v-else>
      <!-- Pre-confirmation -->
      <div v-if="!confirmed" class="card bg-cream">
        <div class="text-center mb-8">
          <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Checkout</span>
          <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">Confirm Your Order</h1>
        </div>

        <!-- Order recap -->
        <div class="space-y-3 mb-8">
          <div v-for="item in items" :key="item.id" class="flex justify-between items-center py-2 border-b border-espresso/10">
            <div class="flex items-center gap-3">
              <img :src="item.image" :alt="item.name" class="w-10 h-10 border border-espresso/20 object-cover" />
              <div>
                <p class="font-display text-xs uppercase tracking-wider text-espresso">{{ item.name }}</p>
                <p class="font-mono text-[9px] text-espresso/40">×{{ item.quantity }} · {{ item.weight }}</p>
              </div>
            </div>
            <span class="font-display text-sm text-espresso">Rp {{ (parseInt(item.price) * item.quantity).toLocaleString('id-ID') }}</span>
          </div>
        </div>

        <div class="border-t-2 border-espresso/20 pt-4 space-y-2 mb-8">
          <div class="flex justify-between">
            <span class="font-mono text-xs text-espresso/60">Subtotal</span>
            <span class="font-display text-sm text-espresso">Rp {{ formatPrice(cartSubtotal) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-mono text-xs text-espresso/60">Shipping</span>
            <span class="font-display text-sm text-espresso">Rp {{ formatPrice(shippingTotal) }}</span>
          </div>
          <div class="flex justify-between pt-2 border-t-2 border-espresso">
            <span class="font-display text-sm font-bold uppercase tracking-wider text-espresso">Total</span>
            <span class="font-display text-lg font-bold text-espresso">Rp {{ formatPrice(cartTotal) }}</span>
          </div>
        </div>

        <button @click="confirmOrder" class="btn-primary w-full text-center">
          Place Order — Rp {{ formatPrice(cartTotal) }}
        </button>
      </div>

      <!-- Confirmed state -->
      <div v-else class="card bg-cream text-center py-16">
        <div class="mb-6">
          <div class="w-16 h-16 border-2 border-espresso bg-tan/20 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-espresso"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Confirmed</span>
          <h2 class="font-display text-2xl font-bold uppercase tracking-[0.06em] text-espresso mb-2">Order Placed</h2>
          <p class="text-sm text-espresso/60 max-w-sm mx-auto leading-relaxed">
            Thanks for your order! We'll start roasting right away.
            You'll get a confirmation email shortly.
          </p>
        </div>

        <!-- Order details -->
        <div class="inline-block text-left border-2 border-espresso/20 p-4 mb-8">
          <div class="font-mono text-[10px] uppercase tracking-wider space-y-1 text-espresso/60">
            <p>Order #{{ orderNumber }}</p>
            <p>{{ orderDate }}</p>
            <p>{{ items.length }} items · Rp {{ formatPrice(cartTotal) }}</p>
          </div>
        </div>

        <router-link to="/products" class="btn-primary inline-block">Continue Shopping</router-link>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const confirmed = ref(false)
const orderNumber = ref('')
const orderDate = ref('')

const items = computed(() => store.getters['cart/cartItems'])
const cartSubtotal = computed(() => store.getters['cart/cartSubtotal'])
const shippingTotal = computed(() => store.getters['cart/shippingTotal'])
const cartTotal = computed(() => store.getters['cart/cartTotal'])

function formatPrice(price) {
  return parseInt(price).toLocaleString('id-ID')
}

function confirmOrder() {
  orderNumber.value = 'OA-' + Date.now().toString(36).toUpperCase()
  orderDate.value = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
  confirmed.value = true
  store.dispatch('cart/clearCart')
}
</script>
