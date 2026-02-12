<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabase'

// Props & Emits untuk kontrol Mobile
const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])

const route = useRoute()
const router = useRouter()
const isCollapsed = ref(false) // State untuk minimize sidebar di desktop

// Menu Items
const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />'
  },
  {
    name: 'Keuangan',
    path: '/finance',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />'
  },
  {
    name: 'Pesan Masuk',
    path: '/messages',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />'
  },
  {
    name: 'Proyek',
    path: '/projects',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />'
  },
  {
    name: 'Pengaturan',
    path: '/settings',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
  },
]

// Fungsi Logout
const handleLogout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div>
    <div v-if="isOpen" @click="$emit('close')"
      class="fixed inset-0 z-20 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-opacity"></div>

    <aside
      class="fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out flex flex-col"
      :class="[
        isOpen ? 'translate-x-0' : '-translate-x-full', // Logic Mobile
        isCollapsed ? 'lg:w-20' : 'lg:w-64', // Logic Desktop (Lebar)
        'lg:translate-x-0 lg:static lg:h-screen' // Reset untuk Desktop
      ]">

      <div class="h-16 flex items-center justify-between pl-4 border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div
            class="w-8 h-8  rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-blue-500/30">
            D
          </div>
          <span class="font-bold text-xl tracking-tight text-gray-800 dark:text-white transition-opacity duration-300"
            :class="isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'">
            My<span class="text-blue-600"></span>
          </span>
        </div>

        <button @click="isCollapsed = !isCollapsed"
          class="hidden lg:flex p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform transition-transform duration-300"
            :class="isCollapsed ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>

        <button @click="$emit('close')" class="lg:hidden p-1 text-gray-500 hover:text-red-500 transition-colors">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      </div>

      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="group flex items-center px-3 py-3 rounded-xl transition-all duration-200 relative overflow-hidden"
          active-class="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium shadow-sm"
          :class="!route.path.startsWith(item.path) ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white' : ''">
          <span v-if="route.path === item.path"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></span>

          <svg class="w-6 h-6 shrink-0 transition-colors duration-200"
            :class="route.path === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" v-html="item.icon"></svg>

          <span class="ml-3 whitespace-nowrap transition-all duration-300 origin-left"
            :class="isCollapsed ? 'lg:opacity-0 lg:hidden' : 'opacity-100'">
            {{ item.name }}
          </span>

          <div v-if="isCollapsed"
            class="hidden lg:group-hover:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
            {{ item.name }}
          </div>
        </router-link>

      </nav>

      <div class="p-3 border-t border-gray-100 dark:border-gray-700">
        <div
          class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700"
          :class="isCollapsed ? 'justify-center' : ''">
          <div class="relative shrink-0">
            <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Avatar"
              class="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-gray-600">
            <span
              class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full"></span>
          </div>

          <div class="flex-1 overflow-hidden transition-all duration-300"
            :class="isCollapsed ? 'lg:w-0 lg:opacity-0 hidden' : 'w-auto opacity-100'">
            <p class="text-sm font-bold text-gray-900 dark:text-white truncate">Administrator</p>
            <button @click="handleLogout"
              class="text-xs text-red-500 hover:text-red-600 font-medium flex items-center mt-0.5 transition-colors">
              Keluar
              <svg class="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </aside>
  </div>
</template>
