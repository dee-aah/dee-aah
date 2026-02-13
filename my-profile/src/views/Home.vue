<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
// --- Logic untuk Typing Effect ---
const roles = ['Web Developer', '']
const currentRole = ref('')
const isDeleting = ref(false)
const loopNum = ref(0)
const typingSpeed = ref(150)

function handleTyping() {
  const i = loopNum.value % roles.length
  const fullText = roles[i]

  if (isDeleting.value) {
    currentRole.value = fullText.substring(0, currentRole.value.length - 1)
  } else {
    currentRole.value = fullText.substring(0, currentRole.value.length + 1)
  }

  // Kecepatan mengetik vs menghapus
  typingSpeed.value = isDeleting.value ? 50 : 150

  if (!isDeleting.value && currentRole.value === fullText) {
    typingSpeed.value = 2000 // Jeda saat teks selesai diketik
    isDeleting.value = true
  } else if (isDeleting.value && currentRole.value === '') {
    isDeleting.value = false
    loopNum.value++
    typingSpeed.value = 500 // Jeda sebelum mengetik kata baru
  }

  setTimeout(handleTyping, typingSpeed.value)
}

onMounted(() => {
  handleTyping()
})
</script>

<template>
  <section id="home" class="relative pt-32 pb-20 dark:bg-slate-600 lg:pt-6 lg:pb-32 overflow-hidden">

    <div class="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 transform">
      <div class="h-96 w-96 rounded-full bg-blue-500/20 blur-3xl filter dark:bg-blue-500/10"></div>
    </div>
    <div class="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4 transform">
      <div class="h-96 w-96 rounded-full bg-purple-500/20 blur-3xl filter dark:bg-purple-500/10"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        <div class="space-y-8 text-center lg:text-left">
          <div class="space-y-4">
            <div class=" flex flex-row content-center">
              <div>
                <Vue3Lottie animationLink="https://lottie.host/79e74f15-6d50-4288-9d75-e6f7a49b938a/Ei1yHfvJ2K.json" :height="50"
                :width="50" loop autoplay />
              </div>
              <div class="content-center">
                <h2 class="text-blue-600  dark:text-blue-400 font-semibold tracking-wide uppercase text-sm">Halo, nama saya</h2>
              </div>
            </div>

            <h1 class="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Dede Ahmad <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Maolana</span>
            </h1>

            <div class="h-8 text-2xl lg:text-3xl font-medium text-gray-500 dark:text-gray-400">
              Seorang <span class="text-gray-900 dark:text-white">{{ currentRole }}</span>
              <span class="animate-pulse">|</span>
            </div>

            <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Saya membangun website modern yang responsif dan performa tinggi menggunakan teknologi terbaru seperti
              Vue.js dan Tailwind CSS. Mari wujudkan ide digital Anda.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="/Portfolio"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1">
              Lihat Portofolio
            </a>
            <a href="https://wa.me/qr/S2QSOXA5J4F3O1"
              class="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              Hubungi Saya
            </a>
          </div>

          <div class="pt-8 border-t border-gray-200 dark:border-gray-800">
            <p class="text-sm text-gray-500 mb-4">Tech Favorit :</p>
            <div
              class="flex gap-6 justify-center lg:justify-start opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <!-- <img width="30" height="30" src="https://img.icons8.com/color/48/html-5--v1.png" alt="html-5--v1"/> -->
              <img width="30" height="30" src="https://img.icons8.com/color/48/visual-studio-code-2019.png" alt="visual-studio-code-2019"/>
              <img width="30" height="30" src="data:image/png;base64,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" alt="laravel">
              <img width="30" height="30" src="https://img.icons8.com/color/48/docker.png" alt="docker"/>
              <img width="30" height="30" src="https://img.icons8.com/fluency/48/mysql-logo.png" alt="mysql-logo"/>
              <!-- <img width="30" height="30" src="https://img.icons8.com/color/48/postgreesql.png" alt="postgreesql"/> -->
              <img width="30" height="30" src="https://img.icons8.com/color/48/github.png" alt="html-5--v1"/>
              <!-- <svg class="h-8 w-8" viewBox="0 0 128 128" width="24" height="24" data-name="Layer 1" id="Layer_1"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110H78.8z" fill="#41B883" />
                <path d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" fill="#35495E" />
              </svg> -->
              <img width="30" height="30" src="https://img.icons8.com/color/48/google-colab.png" alt="google-colab"/>
              <img width="30" height="30" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-project-jupyter-a-nonprofit-organization-created-to-open-source-software-logo-color-tal-revivo.png" alt="external-project-jupyter-a-nonprofit-organization-created-to-open-source-software-logo-color-tal-revivo"/>
              <svg class="h-8 w-8 text-sky-400 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="relative mx-auto lg:ml-auto w-full max-w-md lg:max-w-full">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur-lg animate-pulse">
          </div>

          <div class="relative rounded-xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800 aspect-[4/5] group">
            <img src="/myp.jpeg" alt="Profile Photo"
              class="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110" />

            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 to-transparent">
              <div class="flex items-center gap-3">
                <div class="flex -space-x-2">
                  <div>
                    <Vue3Lottie animationLink="https://lottie.host/c3675dd9-649e-46e9-9148-bb75fd781206/396TVxhVLk.json" :height="80"
                :width="80" loop autoplay /></div>
                </div>
                <div class="text-white">
                  <p class="text-sm font-bold">Open to Work</p>
                  <p class="text-xs text-gray-300">Available for Freelance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>