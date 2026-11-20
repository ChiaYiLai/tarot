<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[#100E17] text-stone-100">
    <AppNavbar />

    <RouterView />
  </div>
</template>
