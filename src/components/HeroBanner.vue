<template>
  <section class="border-b-2 border-espresso bg-cream">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
      <!-- Text block -->
      <div class="lg:col-span-2 flex flex-col justify-center px-6 lg:px-12 py-12 lg:py-16 border-b-2 lg:border-b-0 lg:border-r-2 border-espresso">
        <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 mb-4">Est. 2026 · Bandung</span>
        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-[0.05em] text-espresso leading-[0.95] mb-6">
          OAT<br />&amp; ASHES
        </h1>
        <p class="font-body text-sm sm:text-base text-espresso/70 leading-relaxed max-w-md mb-8">
          Small-batch roasts, single-origin teas, and the quiet ritual of a proper brew.
          We source directly, roast weekly, and ship fresh.
        </p>
        <div class="flex flex-wrap gap-3">
          <router-link to="/products" class="btn-primary inline-block">Browse the Collection</router-link>
          <router-link to="/products" class="btn-ghost inline-block">View Latest Roasts →</router-link>
        </div>
      </div>

      <!-- Image block — asymmetric split -->
      <div class="lg:col-span-3 grid grid-cols-2 grid-rows-2 min-h-[300px] lg:min-h-0">
        <div class="col-span-2 border-b-2 border-espresso overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80"
            alt="Coffee beans scattered on a warm wooden surface"
            class="w-full h-full object-cover grayscale-[30%] sepia-[10%] hover:grayscale-0 hover:sepia-0 transition-all duration-500"
          />
        </div>
        <div class="border-r-2 border-espresso overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=600&q=80"
            alt="Pour over coffee being brewed"
            class="w-full h-full object-cover grayscale-[30%] sepia-[10%] hover:grayscale-0 hover:sepia-0 transition-all duration-500"
          />
        </div>
        <div class="flex items-center justify-center bg-tan/10 px-4">
          <p class="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-espresso/50 text-center leading-relaxed">
            Roasted every<br />Tuesday &amp; Friday
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
