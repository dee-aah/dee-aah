<script setup>
import { ref, computed } from 'vue'

// 1. Data Kategori
const categories = ['Semua', 'Web Dev', 'Data Analysis',]
const activeCategory = ref('Semua')

// 2. Data Proyek (Sesuaikan dengan proyek nyata Anda)
const projects = [
  {
    id: 1,
    title: 'Web Profil DPPKBP3A Kota Tasikmalaya',
    category: 'Web Dev',
    image: '/Laporan KP.png',
    description: 'Website DPPKBP3A Kota Tasikmalaya menggunakan Laravel  dengan database MySQL.',
    tech: ['Laravel', 'Tailwind', 'MySQL', 'Docker', 'NginX'],
    demoLink: '#',
    repoLink: 'https://github.com/dee-aah/diskominfo.git'
  },
  {
    id: 2,
    title: 'Analisis Sentimen',
    category: 'Data Analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Model NLP untuk menganalisis sentimen publik terhadap kebijakan pemerintah menggunakan Python dan TensorFlow.',
    tech: ['Python', 'NLP', 'TensorFlow'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: 3,
    title: 'Web Rental Mobil',
    category: 'Web Dev',
    image: 'rengo.jpeg',
    description: 'Platform Jasa Rental Mobil',
    tech: ['Laravel', 'Bootstrap','Docker', 'MySQL', 'NginX'],
    demoLink: '#',
    repoLink: 'https://github.com/dee-aah/web-rental.git'
  },
  {
    id: 4,
    title: 'Sistem Informasi Keuangan BMKG',
    category: 'Web Dev',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Sistem manajemen data pegawai pemerintah dengan fitur laporan PDF dan Excel otomatis.',
    tech: ['PHP', 'Bootstrap', 'MySQL','Xampp'],
    demoLink: '#',
    repoLink: 'https://github.com/dee-aah/sistem-informasi-.git'
  },
  {
    id: 5,
    title: 'Prediksi Panen Ikan',
    category: 'Data Analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Placeholder
    description: 'Studi kasus machine learning untuk memprediksi hasil panen perikanan berdasarkan kualitas air.',
    tech: ['Python', 'Scikit-Learn', 'Pandas'],
    demoLink: '#',
    repoLink: '#'
  }
]

// 3. Logic Filter
const filteredProjects = computed(() => {
  if (activeCategory.value === 'Semua') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})
</script>

<template>
  <section id="portfolio" class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-16">
        <h2 class="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase text-sm mb-2">
          Portofolio
        </h2>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Karya Terbaru Saya
        </h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Berikut adalah beberapa proyek pilihan yang telah saya kerjakan, mulai dari pengembangan web hingga analisis data.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
          :class="[
            activeCategory === category 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30' 
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <TransitionGroup 
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-300 ease-in absolute"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
          move-class="transition duration-500"
        >
          
          <div 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col h-full"
          >
            <div class="relative overflow-hidden aspect-video">
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                 <a :href="project.demoLink" class="p-3 bg-white rounded-full text-gray-900 hover:text-blue-600 transition-colors" title="Live Demo">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                 </a>
              </div>
            </div>

            <div class="p-6 flex flex-col flex-grow">
              <div class="flex justify-between items-start mb-2">
                 <span class="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                   {{ project.category }}
                 </span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {{ project.title }}
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                {{ project.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="(tech, index) in project.tech" 
                  :key="index"
                  class="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <a :href="project.repoLink" class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
                  Code
                </a>
                <a :href="project.demoLink" class="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto">
                  Live Demo &rarr;
                </a>
              </div>
            </div>
          </div>

        </TransitionGroup>
      </div>

    </div>
  </section>
</template>