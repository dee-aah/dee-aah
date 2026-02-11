<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase' // Pastikan path ini benar

// --- STATE ---
const isSidebarOpen = ref(false)
const isDark = ref(false)
const isLoading = ref(true)

// Data Statistik (Dummy awal)
const stats = ref([
  { title: 'Total Pesan', value: '0', change: '+12%', icon: 'mail', color: 'bg-blue-500' },
  { title: 'Total Proyek', value: '15', change: '+3', icon: 'folder', color: 'bg-purple-500' },
  { title: 'Views Bulan Ini', value: '1.2k', change: '+18%', icon: 'eye', color: 'bg-green-500' },
  { title: 'Rating', value: '4.9', change: '+0.2', icon: 'star', color: 'bg-yellow-500' },
])

// Data Pesan
const recentMessages = ref([])

// --- FUNGSI ---
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Fetch Data Real dari Supabase
const fetchData = async () => {
  isLoading.value = true
  try {
    // 1. Ambil pesan dari tabel 'contacts'
    const { data, error, count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) throw error

    // Update Data Pesan
    recentMessages.value = data

    // Update Statistik Total Pesan
    stats.value[0].value = count || 0

  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// Cek Dark Mode & Fetch Data
onMounted(() => {
  // Cek Theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
  
  fetchData()
})
</script>

<template>
  

      <main class="flex-1 overflow-x-hidden overflow-y-auto  dark:bg-gray-900 p-6">
        
        <div class="mb-8">
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Selamat datang kembali! Berikut ringkasan aktivitas website Anda.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="(stat, index) in stats" :key="index" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center transition-transform hover:scale-105">
            <div :class="`p-3 rounded-full text-white mr-4 ${stat.color}`">
              <svg v-if="stat.icon === 'mail'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <svg v-if="stat.icon === 'folder'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
              <svg v-if="stat.icon === 'eye'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-if="stat.icon === 'star'" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <div>
              <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">{{ stat.title }}</p>
              <div class="flex items-end gap-2">
                <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ stat.value }}</p>
                <span class="text-xs text-green-500 font-medium mb-1">{{ stat.change }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h3 class="font-bold text-gray-800 dark:text-white">Pesan Terbaru</h3>
            <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">Lihat Semua</button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                  <th class="px-6 py-3 font-medium">Nama</th>
                  <th class="px-6 py-3 font-medium">Email</th>
                  <th class="px-6 py-3 font-medium">Pesan</th>
                  <th class="px-6 py-3 font-medium">Waktu</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                <tr v-if="isLoading">
                  <td colspan="4" class="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
                <tr v-else-if="recentMessages.length === 0">
                  <td colspan="4" class="px-6 py-8 text-center text-gray-500">Belum ada pesan masuk.</td>
                </tr>
                <tr v-else v-for="msg in recentMessages" :key="msg.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ msg.name }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ msg.email }}</td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{{ msg.message }}</td>
                  <td class="px-6 py-4 text-xs text-gray-400">
                    {{ new Date(msg.created_at).toLocaleDateString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
  
</template>