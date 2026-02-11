<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const GITHUB_USERNAME = 'dee-aah'

const skills = ref([])
const animated = ref(false)
const sectionRef = ref(null)

// Mapping bahasa → kategori skill
const skillMap = {
  Web: {
    label: 'HTML, CSS, Vue, JS (FrontEnd)',
    languages: ['JavaScript', 'Vue', 'CSS', 'HTML'],
    query: 'vue'
  },
  Backend: {
    label: 'Laravel (Backend)',
    languages: ['PHP', 'Blade'],
    query: 'laravel'
  },
  ML: {
    label: 'Python & Jupyter Notebook',
    languages: ['Python', 'Jupyter Notebook'],
    query: 'nlp'
  },
  Database: {
    label: 'Lainnya',
    languages: ['PostgreSQL', 'MySQL', 'C#', 'Other'],
    query: 'sql'
  }
}

const fetchSkillsByLOC = async () => {
  const repoRes = await axios.get(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    }
  )

  const repos = repoRes.data
  const counters = {}

  Object.keys(skillMap).forEach(key => (counters[key] = 0))

  for (const repo of repos) {
    if (!repo.languages_url) continue

    const langRes = await axios.get(repo.languages_url, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
      }
    })

    for (const [lang, lines] of Object.entries(langRes.data)) {
      Object.entries(skillMap).forEach(([key, config]) => {
        if (config.languages.includes(lang)) {
          counters[key] += lines
        }
      })
    }
  }

  const total = Object.values(counters).reduce((a, b) => a + b, 0) || 1

  skills.value = Object.entries(skillMap).map(([key, config]) => ({
    name: config.label,
    percent: Math.round((counters[key] / total) * 100),
    query: config.query
  }))
}

// Animasi saat scroll
const observeSection = () => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animated.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(sectionRef.value)
}

const openRepo = (query) => {
  window.open(
    `https://github.com/${GITHUB_USERNAME}?tab=repositories&q=${query}`,
    '_blank'
  )
}

onMounted(async () => {
  await fetchSkillsByLOC()
  observeSection()
})
</script>


<template>
  <section id="About" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative order-2 lg:order-1">
          <div class="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full blur-xl opacity-70">
          </div>
          <div
            class="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-100 dark:bg-purple-900 rounded-full blur-xl opacity-70">
          </div>

          <div
            class="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Keahlian Teknis</h3>

            <div class="space-y-6">
              <div ref="sectionRef" class="space-y-6">
                <div v-for="skill in skills" :key="skill.name" class="cursor-pointer group"
                  @click="openRepo(skill.query)">
                  <div class="flex justify-between mb-2">
                    <span
                      class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition">
                      {{ skill.name }}
                    </span>
                    <span class="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {{ skill.percent }}%
                    </span>
                  </div>

                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      :style="{
                        width: animated ? skill.percent + '%' : '0%'
                      }"></div>
                  </div>

                  <p class="mt-1 text-xs text-gray-400">
                    Klik untuk melihat repository →
                  </p>
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
              Halo! Saya adalah seorang pengembang web yang memiliki ketertarikan mendalam pada dunia data. Saya tidak
              hanya membangun website yang terlihat bagus, tetapi juga fungsional dan cerdas.
            </p>
            <p>
              Perjalanan saya dimulai dari ketertarikan pada <strong class="text-gray-900 dark:text-white">Machine
                Learning</strong> dan <strong class="text-gray-900 dark:text-white">Analisis Data</strong>, yang
              kemudian saya gabungkan dengan kemampuan pengembangan web modern menggunakan <strong
                class="text-gray-900 dark:text-white">Laravel</strong> dan <strong
                class="text-gray-900 dark:text-white">Vue.js</strong>.
            </p>
            <p>
              Saat tidak sedang menulis kode atau melatih model AI, Anda mungkin akan menemukan saya sedang merawat
              akuarium aquascape saya atau mencari inspirasi desain terbaru.
            </p>
          </div>

          <div class="mt-8">
            <a href="#contact"
              class="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
              Download CV / Resume
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
                </path>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>