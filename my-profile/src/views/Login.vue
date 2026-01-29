<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center">
    <div class="w-full max-w-6xl m-5 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <!-- LEFT: LOGIN FORM -->
      <div class="p-5 sm:p-12 text-white rounded-lg bg-slate-800">
        <div class="mb-8">
          <h1 class="text-3xl lg:text-4xl text-sky-500 text-center font-bold mb-2">Selamat Datang kembali</h1>
          <p class="text-gray-400 text-center text-sm">
            Daftarkan Data Diri Anda
          </p>
        </div>
        <form @submit.prevent="submit" class="space-y-5">
          <div>
            <label class="block text-sm mb-1">E-mail</label>
            <input type="email" v-model="email"
              class="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-700 focus:ring-blue-500'" placeholder="nama@email.com">
          </div>
            <p v-if="errors.email" class="text-red-400 text-sm mt-1 ">
              {{ errors.email }}
            </p>         
          <div class="relative">
            <label class="block text-sm mb-1">Kata sandi</label>
            <input v-model="password" :type="showPassword ? 'text' : 'password'" class="w-full rounded-lg bg-slate-800 border px-4 py-2 pr-12
            focus:outline-none focus:ring-2" :class="errors.password
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-700 focus:ring-blue-500'" placeholder="Masukkan Kata Sandi" />
            <button type="button" @click="showPassword = !showPassword" class="absolute pt-6 right-3 top-1/2 -translate-y-1/2
            text-gray-500 hover:text-gray-600">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                -1.274 4.057-5.064 7-9.542 7
                -4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19
                  c-4.478 0-8.268-2.943-9.542-7
                  a9.956 9.956 0 012.042-3.368
                  M6.223 6.223A9.956 9.956 0 0112 5
                  c4.478 0 8.268 2.943 9.542 7
                  a9.956 9.956 0 01-4.043 5.007" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3l18 18" />
              </svg>
            </button>       
          </div>
            <p v-if="errors.password" class="text-red-400 text-sm ">
              {{ errors.password }}
            </p>
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded bg-slate-800 border-slate-600">
              Ingatlah aku
            </label>
            <a href="#" class="text-blue-500 hover:underline">Lupa kata sandi?</a>
          </div>

          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-semibold">
            Masuk ke akun Anda
          </button>

          <div class="flex items-center gap-3">
            <div class="h-px bg-slate-700 flex-1"></div>
            <span class="text-sm text-gray-400">atau</span>
            <div class="h-px bg-slate-700 flex-1"></div>
          </div>

          <button type="button" @click="loginWithGoogle"
            class="w-full flex items-center justify-center gap-2 border border-slate-700 rounded-lg py-2 hover:bg-slate-800 transition">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5">
            Masuk dengan Google
          </button>

          <!-- <button type="button"
            class="w-full flex items-center justify-center gap-2 border border-slate-700 rounded-lg py-2 hover:bg-slate-800 transition">
            <img src="https://www.svgrepo.com/show/475631/apple-color.svg" class="w-5">
            Masuk dengan Apple
          </button> -->
        </form>
      </div>

      <!-- RIGHT: ILLUSTRATION -->
      <div class="hidden lg:flex items-center justify-center  to-slate-800 relative">
        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/illustration.svg"
          alt="Illustration" class="w-3/4 drop-shadow-xl">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const errors = ref({
  email: '',
  password: ''
})

// VALIDASI
const validate = () => {
  errors.value.email = ''
  errors.value.password = ''

  let valid = true

  if (!email.value) {
    errors.value.email = 'Email wajib diisi'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Format email tidak valid'
    valid = false
  }

  if (!password.value) {
    errors.value.password = 'Password wajib diisi'
    valid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password minimal 6 karakter'
    valid = false
  }

  return valid
}

// LOGIN EMAIL
const submit = async () => {
  if (!validate()) return

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    errors.value.password = error.message
    return
  }

  router.push('/dashboard')
}

// LOGIN GOOGLE
const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/dashboard'
    }
  })
}

// const loginWithGoogle = async () => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: window.location.origin + '/dashboard'
//     }
//   })

//   if (error) {
//     alert(error.message)
//   }
// }

</script>
