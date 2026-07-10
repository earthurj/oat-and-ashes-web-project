<template>
  <div class="flex gap-4 py-5 border-b-2 border-espresso/10 last:border-b-0">
    <!-- Image -->
    <router-link :to="`/products/${item.id}`" class="w-20 h-20 flex-shrink-0 border-2 border-espresso/20 overflow-hidden">
      <img :src="item.image || 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=120&q=80'" :alt="item.name" class="w-full h-full object-cover" />
    </router-link>

    <!-- Details -->
    <div class="flex-1 min-w-0">
      <router-link :to="`/products/${item.id}`" class="font-display text-sm font-bold uppercase tracking-[0.04em] text-espresso hover:text-espresso/70 transition-colors block mb-1 truncate">
        {{ item.name }}
      </router-link>
      <p v-if="item.weight" class="font-mono text-[10px] text-espresso/40 uppercase mb-2">{{ item.weight }}</p>

      <div class="flex items-center justify-between gap-4">
        <!-- Quantity -->
        <div class="flex items-center border-2 border-espresso">
          <button @click="decreaseQty" class="w-8 h-8 flex items-center justify-center font-mono text-sm hover:bg-tan/20 transition-colors">−</button>
          <span class="w-8 h-8 flex items-center justify-center font-mono text-xs text-espresso border-x-2 border-espresso">{{ item.quantity }}</span>
          <button @click="increaseQty" class="w-8 h-8 flex items-center justify-center font-mono text-sm hover:bg-tan/20 transition-colors">+</button>
        </div>

        <div class="text-right">
          <span class="font-display text-sm font-bold text-espresso">Rp {{ itemTotal }}</span>
          <button @click="remove" class="block ml-auto font-mono text-[9px] uppercase tracking-wider text-espresso/30 hover:text-red-800 mt-1 transition-colors">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  item: { type: Object, required: true }
})

const store = useStore()

const itemTotal = computed(() => {
  return ((parseInt(props.item.price) || 0) * props.item.quantity).toLocaleString('id-ID')
})

function increaseQty() {
  store.dispatch('cart/updateQuantity', { productId: props.item.id, quantity: props.item.quantity + 1 })
}

function decreaseQty() {
  store.dispatch('cart/updateQuantity', { productId: props.item.id, quantity: props.item.quantity - 1 })
}

function remove() {
  store.dispatch('cart/removeFromCart', props.item.id)
}
</script>
