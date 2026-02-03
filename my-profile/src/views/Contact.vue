<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const isSubmitting = ref(false)

const sendMessage = () => {
    // Simulasi pengiriman pesan
    isSubmitting.value = true
    setTimeout(() => {
        alert(`Terima kasih, ${form.value.name}! Pesan Anda telah "terkirim" (demo).`)
        form.value = { name: '', email: '', message: '' }
        isSubmitting.value = false
    }, 1500)
}
</script>

<template>
    <section id="contact"
        class="relative py-10 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">

        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div class="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div class="text-center mb-16">
                <h2 class="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
                    Hubungi Saya
                </h2>
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Mari Bekerja Sama
                </h1>
            </div>

            <div class="grid lg:grid-cols-3 gap-10 lg:gap-16">

                <div class="lg:col-span-1 space-y-8">
                    <p class="text-gray-600 text-justify dark:text-gray-300 leading-relaxed">
                        Punya ide proyek menarik atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya. Saya
                        selalu terbuka untuk diskusi tentang web development maupun data science.
                    </p>

                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                                <p class="text-gray-600 dark:text-gray-400">dedeahmadmaolana4@gmail.com</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Lokasi</h4>
                                <p class="text-gray-600 dark:text-gray-400">Tasikmalaya, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-2">
                    <form @submit.prevent="sendMessage"
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label for="name"
                                    class="text-sm font-medium text-gray-700 dark:text-gray-300">Nama</label>
                                <input type="text" id="name" v-model="form.name" required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Nama Anda">
                            </div>
                            <div class="space-y-2">
                                <label for="email"
                                    class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <input type="email" id="email" v-model="form.email" required
                                    class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="alamatemail@gmail.com">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="message"
                                class="text-sm font-medium text-gray-700 dark:text-gray-300">Pesan</label>
                            <textarea id="message" rows="5" v-model="form.message" required
                                class="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                                placeholder="Ceritakan tentang proyek Anda..."></textarea>
                        </div>

                        <button type="submit" :disabled="isSubmitting"
                            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <span v-if="isSubmitting">Mengirim...</span>
                            <span v-else>Kirim Pesan</span>
                            <svg v-if="!isSubmitting" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </section>
</template>