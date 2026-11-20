<script setup lang="ts">
import { computed, ref } from 'vue'
import { tarotDeck } from '../data/tarot'

const selectedType = ref('all')

const types = [
  { value: 'all', label: '全部' },
  { value: 'major', label: '大阿爾克那' },
  { value: 'wands', label: '權杖' },
  { value: 'cups', label: '聖杯' },
  { value: 'swords', label: '寶劍' },
  { value: 'pentacles', label: '錢幣' },
]

const filteredCards = computed(() => {
  switch (selectedType.value) {
    case 'major':
      return tarotDeck.filter(card => !['權杖', '聖杯', '寶劍', '錢幣'].some(suit => card.name.startsWith(suit)))
    case 'wands':
      return tarotDeck.filter(card => card.name.startsWith('權杖'))
    case 'cups':
      return tarotDeck.filter(card => card.name.startsWith('聖杯'))
    case 'swords':
      return tarotDeck.filter(card => card.name.startsWith('寶劍'))
    case 'pentacles':
      return tarotDeck.filter(card => card.name.startsWith('錢幣'))
    default:
      return tarotDeck
  }
})
</script>

<template>
  <main class="min-h-screen px-5 py-12 md:py-16">
    <div class="mx-auto max-w-5xl">
      <header class="mb-12 text-center">
        <p class="mb-3 text-xs tracking-[0.5em] text-amber-400">TAROT ENCYCLOPEDIA</p>

        <h1 class="mb-4 text-4xl font-semibold tracking-widest">塔羅圖鑑</h1>

        <p class="text-sm tracking-widest text-stone-400">探索 78 張牌背後的象徵與智慧</p>
      </header>

      <!-- 分類 -->
      <div class="mb-10 flex flex-wrap justify-center gap-3">
        <button
          v-for="type in types"
          :key="type.value"
          @click="selectedType = type.value"
          class="rounded-lg border px-4 py-2 text-sm transition"
          :class="
            selectedType === type.value ? 'border-amber-400 bg-amber-400/15 text-amber-300' : 'border-stone-700 text-stone-400 hover:border-amber-400'
          "
        >
          {{ type.label }}
        </button>
      </div>

      <!-- 卡牌 -->
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <RouterLink
          v-for="card in filteredCards"
          :key="card.id"
          :to="`/library/${card.id}`"
          class="group block cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-amber-400/50"
        >
          <img :src="card.image" :alt="card.name" class="w-full transition duration-500 group-hover:scale-105" />

          <div class="p-3 text-center">
            <h3 class="font-medium text-amber-200">
              {{ card.name }}
            </h3>

            <p class="mt-1 text-xs text-stone-500">
              {{ card.keywords }}
            </p>
          </div>
        </RouterLink>
      </div>

      <p class="mt-10 text-center text-xs text-stone-500">共 {{ filteredCards.length }} 張牌</p>
    </div>
  </main>
</template>
