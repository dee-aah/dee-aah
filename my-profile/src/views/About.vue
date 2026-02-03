<script setup>
// Data Skill (Bisa ditambah/dikurangi)
const skills = [
  { name: 'Vue.js & Tailwind', level: '90%', width: 'w-[90%]' },
  { name: 'Laravel (Backend)', level: '85%', width: 'w-[85%]' },
  { name: 'Python & NLP', level: '80%', width: 'w-[80%]' },
  { name: 'PostgreSQL / SQL', level: '75%', width: 'w-[75%]' },
]

const stats = [
  { label: 'Tahun Pengalaman', value: '3+' },
  { label: 'Proyek Selesai', value: '15+' },
  { label: 'Kopi diminum', value: '∞' },
]
</script>

<template>
  <section id="About" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative order-2 lg:order-1">
          <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full blur-xl opacity-70"></div>
          <div class="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-100 dark:bg-purple-900 rounded-full blur-xl opacity-70"></div>
          
          <div class="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Keahlian Teknis</h3>
            
            <div class="space-y-6">
              <div v-for="skill in skills" :key="skill.name">
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
                  <span class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ skill.level }}</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    class="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    :class="skill.width"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-4 text-center">
              <div v-for="stat in stats" :key="stat.label">
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <h2 class="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
            Tentang Saya
          </h2>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Menggabungkan Logika Data dengan Estetika Web.
          </h2>
          
          <div class="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              Halo! Saya adalah seorang pengembang web yang memiliki ketertarikan mendalam pada dunia data. Saya tidak hanya membangun website yang terlihat bagus, tetapi juga fungsional dan cerdas.
            </p>
            <p>
              Perjalanan saya dimulai dari ketertarikan pada <strong class="text-gray-900 dark:text-white">Machine Learning</strong> dan <strong class="text-gray-900 dark:text-white">Analisis Data</strong>, yang kemudian saya gabungkan dengan kemampuan pengembangan web modern menggunakan <strong class="text-gray-900 dark:text-white">Laravel</strong> dan <strong class="text-gray-900 dark:text-white">Vue.js</strong>.
            </p>
            <p>
              Saat tidak sedang menulis kode atau melatih model AI, Anda mungkin akan menemukan saya sedang merawat akuarium aquascape saya atau mencari inspirasi desain terbaru.
            </p>
          </div>

          <div class="mt-8">
            <a href="#contact" class="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
              Download CV / Resume
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>