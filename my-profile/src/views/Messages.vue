<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

// --- STATE ---
const messages = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedMessage = ref(null) 
const isModalOpen = ref(false)

// --- FETCH DATA ---
const fetchMessages = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    messages.value = data
  } catch (err) {
    console.error('Gagal mengambil pesan:', err.message)
  } finally {
    isLoading.value = false
  }
}

// --- DELETE DATA ---
const deleteMessage = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) return

  try {
    const { error } = await supabase.from('contacts').delete().eq('id', id)
    if (error) throw error

    // Hapus dari state lokal biar ga perlu refresh
    messages.value = messages.value.filter(msg => msg.id !== id)
    // Jika pesan yang dihapus sedang dibuka di modal, tutup modal
    if (selectedMessage.value?.id === id) closeModal()

  } catch (err) {
    alert('Gagal menghapus: ' + err.message)
  }
}

// --- SEARCH LOGIC ---
const filteredMessages = computed(() => {
  if (!searchQuery.value) return messages.value
  const query = searchQuery.value.toLowerCase()
  return messages.value.filter(msg => 
    msg.name.toLowerCase().includes(query) || 
    msg.email.toLowerCase().includes(query)
  )
})

// --- MODAL LOGIC ---
const openModal = (msg) => {
  selectedMessage.value = msg
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => selectedMessage.value = null, 300)
}

// --- FORMAT DATE ---
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

onMounted(() => {
  fetchMessages()
})
</script>

<template>
  <div class="space-y-6">
    
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Pesan Masuk</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Kelola semua pesan dari formulir kontak.</p>
      </div>
      
      <div class="relative w-full sm:w-64">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Cari nama atau email..." 
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
        >
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      
      <div v-if="isLoading" class="p-8 text-center space-y-4">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
        <p class="text-gray-500">Memuat pesan...</p>
      </div>

      <div v-else-if="filteredMessages.length === 0" class="p-12 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">Tidak ada pesan</h3>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Belum ada pesan yang cocok dengan pencarian Anda.</p>
      </div>

      <div v-else>
        <table class="w-full text-left hidden md:table">
          <thead class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th class="px-6 py-4 font-medium">Pengirim</th>
              <th class="px-6 py-4 font-medium">Pesan</th>
              <th class="px-6 py-4 font-medium">Waktu</th>
              <th class="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr 
              v-for="msg in filteredMessages" 
              :key="msg.id" 
              class="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              @click="openModal(msg)"
            >
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mr-3">
                    {{ msg.name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-white">{{ msg.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ msg.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 max-w-md">{{ msg.message }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(msg.created_at) }}
              </td>
              <td class="px-6 py-4 text-right">
                <button 
                  @click.stop="deleteMessage(msg.id)" 
                  class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  title="Hapus Pesan"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
          <div 
            v-for="msg in filteredMessages" 
            :key="msg.id" 
            class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 active:bg-gray-100 transition-colors cursor-pointer"
            @click="openModal(msg)"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
                  {{ msg.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white text-sm">{{ msg.name }}</h4>
                  <p class="text-xs text-gray-500">{{ formatDate(msg.created_at) }}</p>
                </div>
              </div>
              <button 
                @click.stop="deleteMessage(msg.id)" 
                class="text-gray-400 hover:text-red-500 p-1"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeModal"></div>
        
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
          
          <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-4">
               <div class="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                 {{ selectedMessage?.name.charAt(0).toUpperCase() }}
               </div>
               <div>
                 <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ selectedMessage?.name }}</h3>
                 <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedMessage?.email }}</p>
               </div>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto">
            <div class="flex items-center gap-2 mb-4 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 py-1 px-3 rounded-full w-fit">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               Dikirim: {{ formatDate(selectedMessage?.created_at) }}
            </div>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
              {{ selectedMessage?.message }}
            </p>
          </div>

          <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end gap-3">
             <a :href="`mailto:${selectedMessage?.email}`" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
               <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               Balas Email
             </a>
             <button @click="deleteMessage(selectedMessage?.id)" class="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm font-medium transition-colors">
               Hapus
             </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>