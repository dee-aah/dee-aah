<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

// --- STATE ---
const transactions = ref([])
const isLoading = ref(true)
const isModalOpen = ref(false)
const isEditing = ref(false) // Penanda apakah sedang mode Edit atau Tambah
const searchQuery = ref('')

// Form Default
const defaultForm = {
  id: null,
  tanggal: new Date().toISOString().substr(0, 10), // Hari ini
  keterangan: '',
  kategori: 'Lainnya',
  tipe: 'Keluar',
  jumlah: ''
}

const form = ref({ ...defaultForm })

// Pilihan Kategori sesuai Database
const categories = [
  'Pinjam', 'Bayar Iuran', 'Lahiran', 'Meninggal Dunia',
  'Kecelakaan', 'Nikahan', 'Lainnya'
]

// --- FORMATTER ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

// --- CRUD LOGIC ---

// 1. READ (Ambil Data)
const fetchTransactions = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('keuangan') // Pastikan nama tabel sama persis (Case Sensitive)
      .select('*')
      .order('tanggal', { ascending: false }) // Urutkan dari tanggal terbaru

    if (error) throw error
    transactions.value = data
  } catch (err) {
    console.error('Error fetching:', err.message)
  } finally {
    isLoading.value = false
  }
}

// 2. CREATE & UPDATE (Simpan Data)
const handleSubmit = async () => {
  if (!form.value.keterangan || !form.value.jumlah) {
    alert("Mohon lengkapi data!")
    return
  }

  try {
    const payload = {
      tanggal: form.value.tanggal,
      keterangan: form.value.keterangan,
      kategori: form.value.kategori,
      tipe: form.value.tipe,
      jumlah: form.value.jumlah
    }

    let error

    if (isEditing.value) {
      // Logic UPDATE
      const { error: updateError } = await supabase
        .from('keuangan')
        .update(payload)
        .eq('id', form.value.id)
      error = updateError
    } else {
      // Logic CREATE
      const { error: insertError } = await supabase
        .from('keuangan')
        .insert([payload])
      error = insertError
    }

    if (error) throw error

    // Refresh data & Tutup Modal
    await fetchTransactions()
    closeModal()
    alert(isEditing.value ? "Data berhasil diupdate!" : "Data berhasil ditambahkan!")

  } catch (err) {
    alert('Gagal menyimpan: ' + err.message)
  }
}

// 3. DELETE (Hapus Data)
const deleteTransaction = async (id) => {
  if (!confirm("Yakin ingin menghapus data ini?")) return

  try {
    const { error } = await supabase
      .from('keuangan')
      .delete()
      .eq('id', id)

    if (error) throw error

    // Hapus dari state lokal (biar ga perlu fetch ulang server)
    transactions.value = transactions.value.filter(t => t.id !== id)

  } catch (err) {
    alert('Gagal menghapus: ' + err.message)
  }
}

// --- MODAL CONTROLS ---
const openAddModal = () => {
  isEditing.value = false
  form.value = { ...defaultForm } // Reset form
  isModalOpen.value = true
}

const openEditModal = (item) => {
  isEditing.value = true
  // Copy item ke form
  form.value = { ...item }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

// --- SEARCH ---
const filteredTransactions = computed(() => {
  if (!searchQuery.value) return transactions.value
  const query = searchQuery.value.toLowerCase()
  return transactions.value.filter(t =>
    t.keterangan.toLowerCase().includes(query) ||
    t.kategori.toLowerCase().includes(query)
  )
})

// --- STATS ---
const totalSaldo = computed(() => {
  const masuk = transactions.value.filter(t => t.tipe === 'Masuk').reduce((acc, curr) => acc + curr.jumlah, 0)
  const keluar = transactions.value.filter(t => t.tipe === 'Keluar').reduce((acc, curr) => acc + curr.jumlah, 0)
  return masuk - keluar
})

onMounted(() => {
  fetchTransactions()
})
</script>

<template>
  <div class="space-y-6 ">

    <div class="flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Data Keuangan</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Rekap pemasukan dan pengeluaran.</p>
      </div>

      <input v-model="searchQuery" type="text" placeholder="Cari keterangan atau kategori..."
        class="w-full md:w-64 px-4 placeholder:text-gray-500 placeholder:italic placeholder:text-sm py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 dark:text-white">
    </div>

    <div class=" bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-black dark:text-white shadow-lg">
      <p class="text-gray-400 text-sm mb-1">Total Saldo Saat Ini</p>
      <h2 class="text-3xl  font-bold">{{ formatRupiah(totalSaldo) }}</h2>
    </div>

    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

      <div class="p-4 border-b flex justify-end border-gray-100 dark:border-gray-700">
        <button @click="openAddModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-500/30">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <p class="text-sm">Tambah Data</p>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th class="px-6 py-4">Tanggal</th>
              <th class="px-6 py-4">Keterangan</th>
              <th class="px-6 py-4">Kategori</th>
              <th class="px-6 py-4">Tipe</th>
              <th class="px-6 py-4 text-right">Jumlah</th>
              <th class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-if="isLoading">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Memuat data...</td>
            </tr>
            <tr v-else-if="filteredTransactions.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Belum ada data keuangan.</td>
            </tr>
            <tr v-else v-for="item in filteredTransactions" :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {{ formatDate(item.tanggal) }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                {{ item.keterangan }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                  {{ item.kategori }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-bold rounded-full"
                  :class="item.tipe === 'Masuk' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'">
                  {{ item.tipe }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-bold text-right whitespace-nowrap"
                :class="item.tipe === 'Masuk' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ item.tipe === 'Keluar' ? '-' : '+' }} {{ formatRupiah(item.jumlah) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <button @click="openEditModal(item)"
                    class="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button @click="deleteTransaction(item.id)"
                    class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex  items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeModal"></div>
      <div class="relative bg-[#F7FBFC] lg:my-8 dark:bg-gray-800 w-full max-w-md lg:max-w-xl rounded-2xl shadow-xl overflow-hidden">

        <div class="px-6 py-4 border-b border-gray-400 dark:border-gray-700 flex justify-between items-center">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">
            {{ isEditing ? 'Edit Data' : 'Tambah Data Baru' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <label class="cursor-pointer border-gray-400 border rounded-lg p-3 text-center transition-all"
              :class="form.tipe === 'Masuk' ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'border-gray-200 dark:border-gray-700 opacity-60'">
              <input type="radio" v-model="form.tipe" value="Masuk" class="hidden">
              <span class="font-bold">Pemasukan</span>
            </label>
            <label class="cursor-pointer border-gray-400 border rounded-lg p-3 text-center transition-all"
              :class="form.tipe === 'Keluar' ? 'bg-red-50 border-red-500 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'border-gray-200 dark:border-gray-700 opacity-60'">
              <input type="radio" v-model="form.tipe" value="Keluar" class="hidden">
              <span class="font-bold">Pengeluaran</span>
            </label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tanggal</label>
            <input v-model="form.tanggal" type="date"
              class="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          </div>

          <div>
            <label class="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1">Jumlah (Rp)</label>
            <input v-model="form.jumlah" type="number" placeholder="0"
              class="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
          </div>

          <div>
            <label class="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1">Kategori</label>
            <select v-model="form.kategori"
              class="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-normal text-gray-700 dark:text-gray-300 mb-1">Keterangan</label>
            <textarea v-model="form.keterangan" rows="3" placeholder="Contoh: Bayar Iuaran bulan ini..."
              class="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 flex justify-end gap-3">
          <button @click="closeModal"
            class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">Batal</button>
          <button @click="handleSubmit"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
            {{ isEditing ? 'Simpan Perubahan' : 'Simpan Data' }}
          </button>
        </div>

      </div>
    </div>

  </div>
</template>