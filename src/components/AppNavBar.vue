<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'home', label: '占卜', path: '/' },
  { name: 'library', label: '圖鑑', path: '/library' },
]
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-white/10 bg-[#100E17]/90 backdrop-blur-lg">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-5">
      <RouterLink to="/" class="py-4 text-sm tracking-[0.25em] text-amber-300">✧ THE MYSTIC TAROT</RouterLink>

      <div class="flex items-center gap-6">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="relative py-5 text-sm tracking-widest transition"
          :class="route.name === item.name ? 'text-amber-300' : 'text-stone-400 hover:text-amber-200'"
        >
          {{ item.label }}

          <span v-if="route.name === item.name" class="absolute bottom-0 left-0 h-0.5 w-full bg-amber-400" />
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
