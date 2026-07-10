<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="mb-8">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-2">Your Order</span>
      <h1 class="font-display text-3xl font-bold uppercase tracking-[0.06em] text-espresso">Cart</h1>
    </div>

    <!-- Empty state -->
    <div v-if="items.length === 0" class="card text-center py-16">
      <p class="font-mono text-xs uppercase tracking-wider text-espresso/40 mb-2">Your cart is empty</p>
      <p class="font-display text-xs text-espresso/30 mb-6">Time to fix that.</p>
      <router-link to="/products" class="btn-primary inline-block">Browse Products</router-link>
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart items -->
        <div class="lg:col-span-2">
          <div class="card bg-cream">
            <CartItem v-for="item in items" :key="item.id" :item="item" />
          </div>
          <button @click="handleClear" class="mt-4 font-mono text-[10px] uppercase tracking-wider text-espresso/30 hover:text-red-800 transition-colors">
            Clear Cart
          </button>
        </div>

        <!-- Order summary -->
        <div class="lg:col-span-1">
          <div class="card bg-cream sticky top-24">
            <h3 class="font-display text-sm font-bold uppercase tracking-[0.08em] text-espresso mb-5 pb-3 border-b-2 border-espresso/20">Summary</h3>

            <div class="space-y-3 mb-5">
              <div class="flex justify-between">
                <span class="font-mono text-[11px] text-espresso/60">Subtotal ({{ cartCount }} items)</span>
                <span class="font-display text-sm text-espresso">Rp {{ formatPrice(cartSubtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono text-[11px] text-espresso/60">Shipping</span>
                <span class="font-display text-sm text-espresso">Rp {{ formatPrice(shippingTotal) }}</span>
              </div>
              <div class="pt-3 border-t-2 border-espresso/20 flex justify-between">
                <span class="font-display text-sm font-bold uppercase tracking-wider text-espresso">Total</span>
                <span class="font-display text-lg font-bold text-espresso">Rp {{ formatPrice(cartTotal) }}</span>
              </div>
            </div>

            <router-link to="/order-confirmation" class="btn-primary w-full text-center block">
              Proceed to Checkout
            </router-link>

            <p class="font-mono text-[9px] text-espresso/30 mt-3 text-center leading-relaxed">
              Orders are roasted fresh.<br />Ships within 2–3 business days.
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import CartItem from '@/components/CartItem.vue'

const store = useStore()

const items = computed(() => store.getters['cart/cartItems'])
const cartCount = computed(() => store.getters['cart/cartCount'])
const cartSubtotal = computed(() => store.getters['cart/cartSubtotal'])
const shippingTotal = computed(() => store.getters['cart/shippingTotal'])
const cartTotal = computed(() => store.getters['cart/cartTotal'])

function formatPrice(price) {
  return parseInt(price).toLocaleString('id-ID')
}

function handleClear() {
  if (confirm('Remove all items from your cart?')) {
    store.dispatch('cart/clearCart')
  }
}
</script>
