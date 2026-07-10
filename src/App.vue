<template>
  <div class="min-h-screen flex flex-col bg-warm-white">
    <Navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="border-t-2 border-espresso bg-cream py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="font-display uppercase text-sm font-bold tracking-widest text-espresso/60 mb-3">The Roastery</h4>
          <p class="text-sm text-espresso/70 leading-relaxed max-w-xs">
            Small-batch coffee &amp; single-origin tea, roasted weekly in our shop.
            We source directly from growers who treat the land right.
          </p>
        </div>
        <div>
          <h4 class="font-display uppercase text-sm font-bold tracking-widest text-espresso/60 mb-3">Hours</h4>
          <div class="font-mono text-xs text-espresso/70 space-y-1">
            <p>MON–FRI <span class="ml-2">07:00–18:00</span></p>
            <p>SAT <span class="ml-2">08:00–17:00</span></p>
            <p>SUN <span class="ml-2">09:00–15:00</span></p>
          </div>
        </div>
        <div>
          <h4 class="font-display uppercase text-sm font-bold tracking-widest text-espresso/60 mb-3">Contact</h4>
          <div class="font-mono text-xs text-espresso/70 space-y-1">
            <p>hello@oatandashes.co</p>
            <p>+62 812 3456 7890</p>
            <p>Jl. Kopi No. 7, Bandung</p>
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-espresso/20 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span class="font-mono text-[10px] uppercase tracking-widest text-espresso/40">© 2026 OAT &amp; ASHES</span>
        <span class="font-mono text-[10px] uppercase tracking-widest text-espresso/40">ROASTED WITH CARE — BREWED WITH INTENTION</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>
