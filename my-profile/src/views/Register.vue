<template>
  <div class="min-h-screen flex">
    <!-- LEFT -->
    <div class="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center text-white">
      <div class="text-center px-10">
        <h1 class="text-4xl font-bold mb-4">Join Us 🚀</h1>
        <p class="text-lg opacity-90">
          Buat akun dan mulai sekarang
        </p>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="w-full md:w-1/2 flex items-center justify-center bg-gray-900">
      <div class="w-full max-w-md p-8 text-white">
        <h2 class="text-3xl font-bold mb-2">Create Account</h2>
        <p class="text-gray-400 mb-6">Register akun baru</p>

        <form @submit.prevent="register" class="space-y-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full p-3 rounded bg-gray-800 border border-gray-700"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full p-3 rounded bg-gray-800 border border-gray-700"
          />

          <button
            class="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
          >
            Register
          </button>

          <p class="text-red-400 text-sm" v-if="errorMsg">{{ errorMsg }}</p>
        </form>

        <p class="mt-4 text-sm text-gray-400">
          Sudah punya akun?
          <RouterLink to="/login" class="text-indigo-400">Login</RouterLink>
        </p>
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
const errorMsg = ref('')

const register = async () => {
  errorMsg.value = ''

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    errorMsg.value = error.message
    return
  }

  router.push('/login')
}
</script>
