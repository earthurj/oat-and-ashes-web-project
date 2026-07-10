<template>
  <div class="flex items-center justify-center py-16">
    <div class="flex flex-col items-center gap-3">
      <div class="flex gap-1">
        <span class="w-2.5 h-2.5 bg-espresso animate-pulse" :style="{ animationDelay: '0ms' }"></span>
        <span class="w-2.5 h-2.5 bg-espresso animate-pulse" :style="{ animationDelay: '150ms' }"></span>
        <span class="w-2.5 h-2.5 bg-espresso animate-pulse" :style="{ animationDelay: '300ms' }"></span>
      </div>
      <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/40">Brewing...</span>
    </div>
  </div>
</template>
