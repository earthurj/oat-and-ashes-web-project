<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Product Name *</label>
      <input v-model="form.name" type="text" required class="input-field" placeholder="e.g. Ethiopian Yirgacheffe" />
    </div>

    <!-- Category -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Category *</label>
      <select v-model="form.category" required class="input-field">
        <option value="" disabled>Select category</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Origin -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Origin</label>
      <input v-model="form.origin" type="text" class="input-field" placeholder="e.g. Ethiopia, Colombia, Japan" />
    </div>

    <!-- Roast (conditional — coffee) -->
    <div v-if="showRoast">
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Roast Level</label>
      <div class="flex gap-2">
        <button
          v-for="level in roasts"
          :key="level"
          type="button"
          @click="form.roast = level"
          class="flex-1 font-mono text-[10px] uppercase tracking-wider py-2.5 border-2 transition-all duration-150"
          :class="form.roast === level
            ? 'bg-espresso text-cream border-espresso'
            : 'border-espresso/30 text-espresso/60 hover:border-espresso'"
        >{{ level }}</button>
      </div>
    </div>

    <!-- Type -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Type / Variety</label>
      <select v-model="form.type" class="input-field">
        <option value="">—</option>
        <template v-if="isCoffeeCategory">
          <option value="Single Origin">Single Origin</option>
          <option value="Blend">Blend</option>
          <option value="Espresso">Espresso</option>
          <option value="Decaf">Decaf</option>
        </template>
        <template v-else-if="isTeaCategory">
          <option value="Black">Black</option>
          <option value="Green">Green</option>
          <option value="Oolong">Oolong</option>
          <option value="White">White</option>
          <option value="Herbal">Herbal</option>
        </template>
        <template v-else>
          <option value="Brewing Tool">Brewing Tool</option>
          <option value="Accessory">Accessory</option>
          <option value="Merchandise">Merchandise</option>
        </template>
      </select>
    </div>

    <!-- Weight -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Weight / Size</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="w in weights"
          :key="w"
          type="button"
          @click="form.weight = w"
          class="px-4 py-2 font-mono text-[10px] uppercase tracking-wider border-2 transition-all duration-150"
          :class="form.weight === w
            ? 'bg-espresso text-cream border-espresso'
            : 'border-espresso/30 text-espresso/60 hover:border-espresso'"
        >{{ w }}</button>
      </div>
    </div>

    <!-- Price -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Price (IDR) *</label>
      <input v-model="form.price" type="number" required min="0" class="input-field" placeholder="e.g. 150000" />
    </div>

    <!-- Image URL -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Image URL</label>
      <input v-model="form.image" type="url" class="input-field" placeholder="https://images.unsplash.com/..." />
      <p class="font-mono text-[9px] text-espresso/30 mt-1">
        Use <a href="https://unsplash.com" target="_blank" class="underline">Unsplash</a>,
        <a href="https://pexels.com" target="_blank" class="underline">Pexels</a>, or
        <a href="https://freepik.com" target="_blank" class="underline">Freepik</a> for free stock photos
      </p>
    </div>

    <!-- Description -->
    <div>
      <label class="block font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/60 mb-1.5">Description</label>
      <textarea v-model="form.description" rows="4" class="input-field" placeholder="Tasting notes, processing method, brewing recommendations..."></textarea>
    </div>

    <button type="submit" :disabled="saving" class="btn-primary w-full text-center flex justify-center">
      <span v-if="!saving">{{ submitLabel }}</span>
      <span v-else class="inline-flex gap-1">
        <span class="w-1.5 h-1.5 bg-cream animate-pulse"></span>
        <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 150ms"></span>
        <span class="w-1.5 h-1.5 bg-cream animate-pulse" style="animation-delay: 300ms"></span>
      </span>
    </button>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  product: { type: Object, default: null },
  saving: { type: Boolean, default: false }
})

const emit = defineEmits(['submit'])

const categories = [
  'Coffee Beans',
  'Loose Leaf Tea',
  'Matcha',
  'Brewing Equipment',
  'Merchandise'
]

const roasts = ['Light', 'Medium', 'Dark']
const weights = ['100g', '250g', '500g', '1kg']

const form = ref({
  name: '',
  category: '',
  origin: '',
  roast: '',
  type: '',
  weight: '',
  price: '',
  image: '',
  description: ''
})

// Populate form if editing
watch(() => props.product, (product) => {
  if (product) {
    form.value = {
      name: product.name || '',
      category: product.category || '',
      origin: product.origin || '',
      roast: product.roast || '',
      type: product.type || '',
      weight: product.weight || '',
      price: product.price || '',
      image: product.image || '',
      description: product.description || ''
    }
  }
}, { immediate: true })

const submitLabel = computed(() => props.product ? 'Save Changes' : 'Add Product')

const isCoffeeCategory = computed(() =>
  ['Coffee Beans'].includes(form.value.category)
)
const isTeaCategory = computed(() =>
  ['Loose Leaf Tea', 'Matcha'].includes(form.value.category)
)
const showRoast = computed(() => isCoffeeCategory.value)

// Reset roast & type when category changes
watch(() => form.value.category, (newCat) => {
  if (!['Coffee Beans'].includes(newCat)) {
    form.value.roast = ''
  }
})

function handleSubmit() {
  emit('submit', { ...form.value })
}
</script>
