<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { Vue3Lottie } from 'vue3-lottie'
const form = ref({
    name: '',
    email: '',
    message: ''
})

const isSubmitting = ref(false)

const sendMessage = async () => {
    // Validasi sederhana
    if (!form.value.name || !form.value.email || !form.value.message) {
        alert('Harap isi semua kolom!')
        return
    }
    isSubmitting.value = true

    try {
        const { error } = await supabase
            .from('contacts')
            .insert([
                {
                    name: form.value.name,
                    email: form.value.email,
                    message: form.value.message
                }
            ])

        if (error) throw error

        // Jika sukses
        alert('Pesan berhasil dikirim! Terima kasih.')
        form.value = { name: '', email: '', message: '' } // Reset form

    } catch (error) {
        console.error('Error:', error.message)
        alert('Gagal mengirim pesan: ' + error.message)
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section id="contact"
        class="relative py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">

        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div class="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">Hubungi
                    Saya</h2>
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Mari Bekerja Sama</h1>
            </div>

            <div class="grid lg:grid-cols-5 gap-10 lg:gap-10">

                <div class="lg:col-span-2 space-y-8">
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Punya ide proyek menarik? Jangan ragu menghubungi saya.
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-[#E8F9FD] dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Vue3Lottie animationLink="https://lottie.host/8c65f1be-54e2-4f1f-9378-23307335a2bd/R2PbECeCJD.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                                <p class="text-gray-600 dark:text-gray-400">dedeahmadmaolana4@gmail.com</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Vue3Lottie animationLink="https://lottie.host/107b3851-67a5-46f0-81dc-7e328f7b0feb/5O19HLFmCy.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Instagram</h4>
                                <a href="https://www.instagram.com/dede_am4?utm_source=qr&igsh=MXR5NXh2cWtvYXNrZA=="class="text-gray-600 dark:text-gray-400">dede_am4</a>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-blue-300 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Vue3Lottie animationLink="https://lottie.host/7bbeea65-8adb-4798-af1c-d4bf3b9059a7/z97To0mNmP.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Facebook</h4>
                                <a href="https://www.facebook.com/share/1C9SUqzzvK/"class="text-gray-600 dark:text-gray-400">シ ニ ア </a>
                            </div>
                        </div>
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-[#3F3F44] dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Vue3Lottie animationLink="https://lottie.host/4aed3850-dfb2-46d3-be40-ba65ef8cd172/ekN9pJuLOL.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">TikTok</h4>
                                <a href="https://www.tiktok.com/@dee_am?_r=1&_t=ZS-93szyIo2wNt" class="text-gray-600 dark:text-gray-400">dee_am</a>
                            </div>
                        </div>
                        <!-- <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Vue3Lottie animationLink="https://lottie.host/5ef69e9f-132e-4771-aa59-27b80d67024f/UmJQiK58ZE.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">WhatsApp</h4>
                                <a href="https://wa.me/qr/S2QSOXA5J4F3O1" class="text-gray-600 dark:text-gray-400">0822-1551-1904</a>
                            </div>
                        </div> -->
                        <div class="flex items-start space-x-4">
                            <div
                                class="flex-shrink-0 w-12 h-12 bg-blue-200 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Vue3Lottie animationLink="https://lottie.host/32375e4b-f7bd-4172-8318-c4731861dab1/FoG0vkS8xk.json" :height="50"
                                    :width="50" loop autoplay />
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-gray-900 dark:text-white">LinkedIn</h4>
                                <a class="text-gray-600 dark:text-gray-400" href="https://www.linkedin.com/in/dede-ahmad-m-54834b302?utm_source=share_via&utm_content=profile&utm_medium=member_android">Dede Ahmad M</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-3">
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