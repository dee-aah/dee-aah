<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// --- STATE ---
const transactions = ref([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedYear = ref('')
const activeTab = ref('all') // 'all' atau 'loan'
const isDark = ref(false) // <--- INI YANG KURANG TADI (State Mode Malam)

// --- FETCH DATA ---
const fetchTransactions = async () => {
    isLoading.value = true
    try {
        const { data, error } = await supabase
            .from('keuangan')
            .select('*')
            .order('tanggal', { ascending: false })

        if (error) throw error
        transactions.value = data
    } catch (err) {
        console.error('Error fetching:', err.message)
    } finally {
        isLoading.value = false
    }
}

// --- LOGIKA UTAMA ---

// 1. Cek Apakah Pinjaman Sudah > 3 Bulan (Overdue)
const isOverdue = (dateString) => {
    const transactionDate = new Date(dateString)
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

    // Jika tanggal transaksi LEBIH KECIL (lebih lampau) dari 3 bulan lalu -> True
    return transactionDate < threeMonthsAgo
}

// 2. Filter Data
const availableYears = computed(() => {
    const years = transactions.value.map(t => new Date(t.tanggal).getFullYear())
    return [...new Set(years)].sort((a, b) => b - a)
})

const filteredTransactions = computed(() => {
    return transactions.value.filter(t => {
        // Filter Tab
        if (activeTab.value === 'loan' && t.kategori !== 'Pinjam') return false

        // Filter Search
        const matchSearch = searchQuery.value
            ? t.keterangan.toLowerCase().includes(searchQuery.value.toLowerCase())
            : true

        // Filter Tahun
        const year = new Date(t.tanggal).getFullYear()
        const matchYear = selectedYear.value
            ? year === parseInt(selectedYear.value)
            : true

        return matchSearch && matchYear
    })
})

// 3. Hitung Total Saldo (Berdasarkan data yang difilter)
const totalSaldo = computed(() => {
    return filteredTransactions.value.reduce((acc, curr) => {
        if (curr.tipe === 'Masuk') return acc + curr.jumlah
        if (curr.tipe === 'Keluar') return acc - curr.jumlah
        return acc
    }, 0)
})

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

// --- CETAK PDF ---
const downloadPDF = () => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(16)
    doc.text('LAPORAN KEUANGAN BMKG', 105, 15, { align: 'center' })
    doc.setFontSize(10)
    doc.text(`Total Saldo Saat Ini: ${formatRupiah(totalSaldo.value)}`, 105, 22, { align: 'center' })

    const dataUrutLama = [...filteredTransactions.value].sort((a, b) => {
        return new Date(a.tanggal) - new Date(b.tanggal)
    })

    // 3. Gunakan 'dataUrutLama' untuk membuat baris tabel
    const tableBody = dataUrutLama.map((item, index) => {
        // Tandai di PDF jika menunggak
        let status = item.kategori
        if (item.kategori === 'Pinjam' && isOverdue(item.tanggal)) {
            status += ' (Jatuh Tempo)'
        }

        return [
            index + 1,
            formatDate(item.tanggal),
            item.keterangan,
            status, 
            item.tipe === 'Masuk' ? formatRupiah(item.jumlah) : '-',
            item.tipe === 'Keluar' ? formatRupiah(item.jumlah) : '-'
        ]
    })

    autoTable(doc, {
        startY: 30,
        head: [['No', 'Tanggal', 'Keterangan', 'Kategori', 'Pemasukan', 'Pengeluaran']],
        body: tableBody,
        theme: 'grid',
        headStyles: { fillColor: [44, 62, 80] },
        columnStyles: {
            4: { halign: 'right', textColor: [0, 150, 0] },
            5: { halign: 'right', textColor: [200, 0, 0] }
        }
    })

    doc.save(`Laporan Keuangan BMKG ${new Date().toISOString().slice(0, 10)}.pdf`)
}

// --- LOGIKA DARK MODE ---
const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}

// Cek preferensi awal saat website dibuka
const initTheme = () => {
    // Cek LocalStorage atau Preferensi Sistem
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    } else {
        isDark.value = false
        document.documentElement.classList.remove('dark')
    }
}

onMounted(() => {
    fetchTransactions()
    initTheme() // <--- JALANKAN CEK TEMA SAAT MOUNT
})
</script>

<template>
    <div class="min-h-screen pt-10 p-4 bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
        
        <div class="flex justify-end max-w-6xl mx-auto mb-4">
             <button 
             @click="toggleTheme" 
             class="p-2 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none flex items-center gap-2"
             aria-label="Toggle Dark Mode"
           >
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <span class="text-xs font-medium text-gray-600 dark:text-gray-300 pr-1">
                  {{ isDark ? 'Mode Terang' : 'Mode Gelap' }}
              </span>
           </button>
        </div>

        <div class="justify-center lg:max-w-6xl lg:w-full lg:mx-auto lg:text-center p-5 mb-5">
            <h1 class="lg:text-3xl text-2xl text-center font-bold text-gray-900 dark:text-white mb-2">Data Keuangan BMKG</h1>
            <p class="text-gray-600 text-justify text-sm lg:text-base lg:justify-center dark:text-gray-400">
                Laporan keuangan <span class="text-blue-700 dark:text-blue-400 font-bold">Barudak Mania Kikisik Galunggung</span>. Dana 
                <span class="font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded">Pinjaman</span>
                diberi waktu untuk mengembalikan maksimal 3 bulan dari waktu peminjaman dan dana yang dapat dipinjam maksimal 50% dari jumlah Dana kas.
            </p>
        </div>

        <div class="container mx-auto px-0 lg:px-4 pb-12 max-w-6xl">

            <div
                class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-4 lg:p-6 text-white shadow-lg mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <p class="text-blue-100 text-center md:text-left text-sm font-medium mb-1">Total Saldo </p>
                    <h2 class="text-2xl lg:text-4xl font-bold">{{ formatRupiah(totalSaldo) }}</h2>
                </div>
                <div class="text-right hidden md:block">
                    <p class="text-xs text-blue-200 opacity-80">Data terakhir diperbarui</p>
                    <p class="text-sm font-bold">{{ new Date().toLocaleDateString('id-ID', {
                        weekday: 'long', year:
                            'numeric', month: 'long', day: 'numeric' }) }}</p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">

                <div class="grid grid-cols-2 lg:w-80 w-full gap-3 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                    <button @click="activeTab = 'all'" class="px-4 py-2 rounded-md text-sm font-medium transition-all"
                        :class="activeTab === 'all' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'">
                        Semua Data
                    </button>
                    <button @click="activeTab = 'loan'" class="px-4 py-2 rounded-md text-sm font-medium transition-all"
                        :class="activeTab === 'loan' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'">
                        Khusus Pinjaman
                    </button>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <input v-model="searchQuery" type="text" placeholder="Cari data..."
                        class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                    <div class="grid grid-cols-2 gap-3 ">
                    <select v-model="selectedYear"
                        class="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Semua Tahun</option>
                        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
                    </select>
                    
                    <button @click="downloadPDF"
                        class="bg-gray-800 hover:bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>PDF</span>
                    </button>
                </div>
                </div>
            </div>

            <div
                class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead
                            class="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider border-b border-gray-200 dark:border-gray-700">
                            <tr class="text-center">
                                <th class="px-6 py-4 hidden lg:block font-bold">Tanggal</th>
                                <th class="px-6 py-4 font-bold">Keterangan</th>
                                <th class="px-6 py-4 font-bold">Kategori</th>
                                <th class="px-6 py-4 font-bold text-right">Jumlah</th>
                                <th class="px-6 py-4 hidden lg:block font-bold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y text-center divide-gray-100 dark:divide-gray-700">
                            <tr v-if="isLoading">
                                <td colspan="5" class="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                            </tr>
                            <tr v-else-if="filteredTransactions.length === 0">
                                <td colspan="5" class="px-6 py-8 text-center text-gray-500">Data tidak ditemukan.</td>
                            </tr>
                            <tr v-else v-for="item in filteredTransactions" :key="item.id"
                                class="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30" :class="{
                                    'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500': item.kategori === 'Pinjam' && isOverdue(item.tanggal),
                                    'bg-yellow-50/50 dark:bg-yellow-900/10': item.kategori === 'Pinjam' && !isOverdue(item.tanggal)
                                }">
                                <td class="px-6 hidden lg:block py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                                    {{ formatDate(item.tanggal) }}
                                </td>
                                <td class="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                    {{ item.keterangan }}

                                    <div v-if="item.kategori === 'Pinjam' && isOverdue(item.tanggal)"
                                        class="mt-1 flex items-center text-xs justify-center text-red-600 font-bold animate-pulse">
                                        <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Jatuh Tempo <span class="hidden lg:block">(> 3 Bulan)</span>
                                    </div>

                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                        {{ item.kategori }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-sm font-bold text-right whitespace-nowrap"
                                    :class="item.tipe === 'Masuk' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                                    {{ item.tipe === 'Keluar' ? '-' : '+' }} {{ formatRupiah(item.jumlah) }}
                                </td>
                                <td class="px-6 hidden lg:block py-4 text-center">
                                    <span
                                        class="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border"
                                        :class="item.tipe === 'Masuk' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'">
                                        {{ item.tipe }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-4 text-center text-xs text-gray-400">
                &copy; {{ new Date().getFullYear() }} Data Keuangan BMKG
            </div>

        </div>
    </div>
</template>