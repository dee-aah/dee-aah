<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

// Kembalikan ke URL biasa (pakai garis miring)
const navigation = [
    { name: 'Home', href: '/Home' }, // atau '/'
    { name: 'About Me', href: '/About' },
    { name: 'Portofolio', href: '/Portfolio' },
    { name: 'Contact', href: '/Contact' },
]

// Fungsi Toggle Menu Mobile
function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

// Fungsi Toggle Dark Mode
function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

// Cek preferensi saat website dimuat (Cukup ini saja yang tersisa di onMounted)
onMounted(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    }
})
</script>

<template>
    <nav
        class="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

                <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                    <div
                        class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                        P
                    </div>
                    <span class="font-bold text-xl tracking-tight text-gray-800 dark:text-white transition-colors">
                        My<span class="text-blue-600 dark:text-blue-400">Profile</span>
                    </span>
                </div>

                <div class="hidden md:flex space-x-8 items-center">
                    <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                        class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        active-class="!text-blue-600 dark:!text-blue-400 font-bold">
                        {{ item.name }}
                    </router-link>

                    <button @click="toggleTheme"
                        class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Toggle Dark Mode">
                        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>
                </div>

                <div class="md:hidden flex items-center gap-4">
                    <button @click="toggleTheme"
                        class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </button>

                    <button @click="toggleMenu"
                        class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2 rounded-md">
                        <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-y-4 opacity-0" enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-4 opacity-0">
            <div v-if="isMenuOpen"
                class="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-lg">
                <div class="px-4 pt-2 pb-6 space-y-2">
                    <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                        class="block px-3 py-3 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        active-class="!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400"
                        @click="isMenuOpen = false">
                        {{ item.name }}
                    </router-link>
                    <div class="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            class="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors">
                            Hire Me Now
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </nav>
</template>