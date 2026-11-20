<script setup lang="ts">
import { ref } from 'vue'
import { tarotDeck, type TarotCard } from '../data/tarot'
import { tarotInterpretations } from '../data/tarotInterpretations'

interface DrawnCard extends TarotCard {
  reversed: boolean
}

type Category = 'overall' | 'love' | 'career' | 'finance' | 'health' | 'relationship' | 'advice' | 'yesno'

const categories: { key: Category; label: string }[] = [
  // { key: 'overall', label: '整體運勢' },
  { key: 'love', label: '愛情' },
  { key: 'career', label: '事業' },
  { key: 'finance', label: '財運' },
  { key: 'health', label: '健康' },
  { key: 'relationship', label: '人際關係' },
  { key: 'advice', label: '建議' },
  { key: 'yesno', label: '是非題' },
]

const selectedCategory = ref<Category | null>(null)

function selectCategory(category: Category) {
  selectedCategory.value = category
  drawnCards.value = []
}

const positionAcitveIndex = ref<number>(0)
const positionsChoice: { id: string; name: string; description: string; positions: Array }[] = [
  {
    id: 'timeline',
    name: '經典時間流',
    description: '傳統過去、現在與未來的脈絡觀察',
    positions: ['過去', '現在', '未來'],
  },
  {
    id: 'problem-solving',
    name: '問題解析',
    description: '適合遇到卡關、想找突破口時',
    positions: ['現況', '阻礙', '建議'],
  },
  {
    id: 'decision-making',
    name: '二選一決策',
    description: '適合在兩個選項間猶豫不決時',
    positions: ['選項 A', '選項 B', '關鍵考量'],
  },
  {
    id: 'relationship',
    name: '關係互動',
    description: '適合感情、伴侶或職場人際關係',
    positions: ['你的狀態', '對方狀態', '關係走向'],
  },
  {
    id: 'inner-alignment',
    name: '身心覺察',
    description: '適合內心矛盾、想釐清真實想法時',
    positions: ['理智想法', '真實感受', '行動指引'],
  },
  {
    id: 'opportunity',
    name: '機會與風險',
    description: '適合評估新計畫、轉職或新嘗試',
    positions: ['優勢資源', '潛在風險', '發展結果'],
  },
]

const drawnCards = ref<DrawnCard[]>([])
const isDrawing = ref(false)
const question = ref('')

const randomInt = (max: number) => {
  const range = 0x100000000
  const limit = Math.floor(range / max) * max
  const buffer = new Uint32Array(1)

  do {
    crypto.getRandomValues(buffer)
  } while (buffer[0] >= limit)

  return buffer[0] % max
}

const drawCards = () => {
  isDrawing.value = true

  // Fisher-Yates 洗牌，抽取三張不重複的牌
  const deck = [...tarotDeck]

  for (let i = deck.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }

  drawnCards.value = deck.slice(0, 3).map(card => ({
    ...card,
    reversed: randomInt(2) === 1,
  }))

  setTimeout(() => {
    isDrawing.value = false
  }, 600)
}

const reset = () => {
  drawnCards.value = []
  question.value = ''
}
</script>

<template>
  <main class="px-5 py-12 md:py-16">
    <div class="mx-auto max-w-5xl">
      <!-- 標題 -->
      <header class="mb-12 text-center">
        <div class="mb-5 text-4xl text-amber-300">✧ ☾ ✧</div>

        <p class="mb-3 text-xs tracking-[0.5em] text-amber-400">THE MYSTIC TAROT</p>

        <h1 class="mb-4 text-4xl font-semibold tracking-widest md:text-5xl">塔羅牌</h1>

        <p class="text-sm tracking-widest text-stone-400">探索內心的答案</p>
      </header>

      <!-- 占卜主題 -->
      <section class="mb-10">
        <h2 class="mb-5 text-center text-lg font-medium tracking-widest text-amber-200">你想占卜什麼？</h2>

        <div class="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            v-for="item in categories"
            :key="item.key"
            @click="selectCategory(item.key)"
            class="rounded-lg border px-4 py-3 text-sm transition"
            :class="
              selectedCategory === item.key
                ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                : 'border-stone-700 bg-stone-900/50 text-stone-400 hover:border-amber-400/60 hover:text-amber-200'
            "
          >
            {{ item.label }}
          </button>
        </div>
      </section>

      <!-- 牌陣模式 -->
      <section class="mb-10">
        <h2 class="mb-5 text-center text-lg font-medium tracking-widest text-amber-200">牌陣模式</h2>

        <div class="mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            v-for="(item, index) in positionsChoice"
            :key="item.id"
            @click="positionAcitveIndex = index"
            class="rounded-lg border px-4 py-3 text-sm transition"
            :class="
              positionAcitveIndex === index
                ? 'border-amber-400 bg-amber-400/15 text-amber-300'
                : 'border-stone-700 bg-stone-900/50 text-stone-400 hover:border-amber-400/60 hover:text-amber-200'
            "
          >
            {{ item.name }}
          </button>
        </div>
      </section>

      <!-- 三張牌 -->
      <section class="grid grid-cols-3 gap-3 md:gap-8">
        <div v-for="(position, index) in positionsChoice[positionAcitveIndex].positions" :key="position" class="flex min-w-0 flex-col items-center">
          <!-- 牌位 -->
          <p class="mb-4 text-xs font-medium tracking-[0.3em] text-amber-400 md:mb-6 md:text-sm">
            {{ position }}
          </p>

          <!-- 卡牌 -->
          <div class="tarot-card relative w-full max-w-[300px] rounded-xl" :class="{ 'animate-card': drawnCards.length && !isDrawing }">
            <!-- 尚未抽牌：卡背 -->
            <img v-if="!drawnCards.length" src="/tarot/back.png" alt="Tarot card back" class="" />

            <!-- 抽牌結果 -->
            <div v-else class="" :class="{ 'rotate-180': drawnCards[index].reversed }">
              <!-- 牌面圖片 -->
              <img :src="drawnCards[index].image" :alt="drawnCards[index].name" class="" />
            </div>
          </div>

          <!-- 卡牌名稱 -->
          <div v-if="drawnCards.length" class="mt-3 text-center">
            <p class="text-xl font-semibold text-amber-200">
              {{ drawnCards[index].name }}
            </p>
            <p class="mt-1 text-xs text-stone-400">
              {{ drawnCards[index].reversed ? '逆位' : '正位' }}
            </p>
          </div>
        </div>
      </section>

      <!-- 按鈕 -->
      <div class="mt-12 flex justify-center gap-4">
        <button
          @click="drawCards"
          :disabled="isDrawing"
          class="rounded-full border border-amber-400 bg-amber-400 px-10 py-4 text-sm font-semibold tracking-[0.3em] text-[#17121b] transition hover:bg-amber-300 disabled:opacity-50"
        >
          {{ drawnCards.length ? '重新抽牌' : '開始抽牌' }}
        </button>

        <button
          v-if="drawnCards.length"
          @click="reset"
          class="rounded-full border border-stone-600 px-6 py-4 text-sm text-stone-300 transition hover:border-amber-400"
        >
          清除
        </button>
      </div>

      <!-- 三張牌解讀 -->
      <section v-if="drawnCards.length && selectedCategory" class="mx-auto mt-12 max-w-4xl space-y-8">
        <h2 class="text-center text-xl tracking-widest text-amber-300">占卜解析</h2>

        <article v-for="(card, index) in drawnCards" :key="card.id" class="rounded-xl border border-amber-400/20 bg-[#171522] p-5 md:p-7">
          <!-- 牌名 -->
          <div class="mb-5 flex items-center justify-between border-b border-amber-400/20 pb-4">
            <div>
              <p class="text-xl tracking-widest text-amber-400">
                {{ positionsChoice[positionAcitveIndex].positions[index] }}
              </p>
              <div class="flex items-center my-2">
                <h3 class="text-2xl font-semibold text-amber-200">
                  {{ card.name }}
                </h3>
                <span
                  class="rounded-full px-3 py-1 ml-3 text-xs"
                  :class="card.reversed ? 'bg-red-400/10 text-red-300' : 'bg-emerald-400/10 text-emerald-300'"
                >
                  {{ card.reversed ? '逆位' : '正位' }}
                </span>
              </div>
              <p class="text-sm leading-7 text-stone-300">
                {{ tarotInterpretations[card.id][card.reversed ? 'reversed' : 'upright'].overall }}
              </p>
            </div>
          </div>

          <!-- 選擇的主題 -->
          <div v-if="selectedCategory !== 'overall'">
            <h4 class="mb-2 font-semibold text-amber-300">
              {{ categories.find(item => item.key === selectedCategory)?.label }}
            </h4>
            <p class="text-xl leading-7 text-stone-300">
              {{ tarotInterpretations[card.id][card.reversed ? 'reversed' : 'upright'][selectedCategory] }}
            </p>
          </div>
        </article>
      </section>

      <!-- 解讀 -->
      <section v-if="drawnCards.length" class="mt-16">
        <div class="mb-8 text-center">
          <p class="mb-3 text-xs tracking-[0.4em] text-amber-400">YOUR READING</p>
          <h2 class="text-2xl tracking-widest">牌面解析</h2>
          <p v-if="question" class="mt-4 text-sm text-stone-400">「{{ question }}」</p>
        </div>

        <div class="space-y-4">
          <article
            v-for="(card, index) in drawnCards"
            :key="card.id"
            class="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-amber-400/30"
          >
            <div class="mb-4 flex items-center justify-between">
              <div>
                <span class="text-xs tracking-widest text-amber-400">
                  0{{ index + 1 }} / {{ positionsChoice[positionAcitveIndex].positions[index] }}
                </span>
                <h3 class="mt-2 text-xl text-amber-100">
                  {{ card.name }}
                </h3>
              </div>

              <span class="rounded-full border border-amber-400/30 px-4 py-2 text-xs text-amber-300">
                {{ card.reversed ? '逆位' : '正位' }}
              </span>
            </div>

            <p class="mb-3 text-sm text-amber-300/80">
              {{ card.keywords }}
            </p>

            <p class="text-sm leading-8 text-stone-300">
              {{ card.reversed ? `逆位提醒：${card.meaning}目前可能需要重新檢視自己的方向，避免過度執著。` : card.meaning }}
            </p>
          </article>
        </div>

        <p class="mt-8 text-center text-xs leading-7 text-stone-500">塔羅牌提供的是思考與自我探索的角度，並非對未來的確定預言。</p>
      </section>

      <footer class="mt-20 border-t border-white/10 pt-6 text-center">
        <p class="text-xs tracking-widest text-stone-600">THE MYSTIC TAROT · 78 CARDS</p>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.tarot-card {
  transition:
    transform 0.5s ease,
    box-shadow 0.5s ease;
}

.tarot-card:hover {
  box-shadow: 0 0 35px rgba(212, 175, 55, 0.2);
}

.animate-card {
  animation: reveal 0.65s ease both;
}

@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
