<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { tarotDeck } from '../data/tarot'
import { tarotInterpretations } from '../data/tarotInterpretations'

const route = useRoute()

const card = computed(() => tarotDeck.find(item => item.id === Number(route.params.id)))

const interpretation = computed(() => (card.value ? tarotInterpretations[card.value.id] : null))

const fields = [
  { key: 'overall', label: '整體' },
  { key: 'love', label: '愛情' },
  { key: 'career', label: '事業' },
  { key: 'finance', label: '財運' },
  { key: 'health', label: '健康' },
  { key: 'relationship', label: '人際關係' },
  { key: 'advice', label: '建議' },
  { key: 'yesno', label: '是非題' },
] as const
</script>

<template>
  <main class="min-h-screen px-5 py-12 md:py-16">
    <div v-if="card && interpretation" class="mx-auto max-w-4xl">
      <RouterLink to="/library" class="mb-8 inline-block text-sm text-stone-400 transition hover:text-amber-300">← 返回圖鑑</RouterLink>

      <header class="mb-12 text-center">
        <p class="mb-3 text-xs tracking-[0.5em] text-amber-400">TAROT CARD</p>

        <h1 class="text-4xl font-semibold tracking-widest text-amber-200">
          {{ card.name }}
        </h1>

        <p class="mt-3 text-sm text-stone-400">
          {{ card.keywords }}
        </p>
      </header>

      <div class="mx-auto mb-12 max-w-[260px]">
        <img :src="card.image" :alt="card.name" class="w-full rounded-xl shadow-2xl shadow-amber-900/20" />
      </div>

      <!-- 正位 -->
      <section class="mb-12">
        <h2 class="mb-6 border-b border-emerald-400/30 pb-4 text-2xl tracking-widest text-emerald-300">正位 Upright</h2>

        <article v-for="field in fields" :key="field.key" class="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 class="mb-3 font-semibold text-amber-300">
            {{ field.label }}
          </h3>

          <p class="leading-8 text-stone-300">
            {{ interpretation.upright[field.key] }}
          </p>
        </article>
      </section>

      <!-- 逆位 -->
      <section>
        <h2 class="mb-6 border-b border-rose-400/30 pb-4 text-2xl tracking-widest text-rose-300">逆位 Reversed</h2>

        <article v-for="field in fields" :key="field.key" class="mb-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 class="mb-3 font-semibold text-amber-300">
            {{ field.label }}
          </h3>

          <p class="leading-8 text-stone-300">
            {{ interpretation.reversed[field.key] }}
          </p>
        </article>
      </section>
    </div>

    <div v-else class="py-20 text-center">
      <p class="text-stone-400">找不到這張塔羅牌</p>

      <RouterLink to="/library" class="mt-5 inline-block text-amber-300">返回圖鑑</RouterLink>
    </div>
  </main>
</template>
