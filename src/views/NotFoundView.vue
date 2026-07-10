<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="text-center">
      <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-espresso/40 block mb-4">404</span>
      <h1 class="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.06em] text-espresso mb-4">
        This Page<br />Doesn't Exist
      </h1>
      <p class="text-sm text-espresso/50 mb-8 max-w-sm mx-auto leading-relaxed">
        Maybe the link was wrong, or the page got moved.
        Either way, there's coffee back at the shop.
      </p>
      <router-link to="/" class="btn-primary inline-block">Back to the Roastery</router-link>
    </div>
  </div>
</template>
