<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Import ketiga layout tadi
import Empty from './layouts/Empty.vue'
import Main from './layouts/Main.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

const route = useRoute()

// Mapping nama layout ke komponen aslinya
const layouts = {
  Empty: Empty,
  Main: Main,
  Dashboard: DashboardLayout
}

// Logic memilih layout
const currentLayout = computed(() => {
  // Ambil meta layout dari router (misal: 'Dashboard')
  const layoutName = route.meta.layout || 'Main' // Default ke 'Main' jika tidak ada meta
  
  // Kembalikan komponen yang sesuai
  return layouts[layoutName]
})
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>