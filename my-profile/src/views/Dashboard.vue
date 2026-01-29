<template>



  <!-- <div class="min-h-screen bg-gray-100 flex">
    
    <aside class="hidden md:flex w-64 bg-gray-900 text-white flex-col">
      <div class="p-6 text-2xl font-bold border-b border-gray-800">
        MyProfile
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <div class="bg-indigo-600 p-3 rounded">Dashboard</div>
      </nav>

      <button
        @click="logout"
        class="m-4 p-3 bg-red-600 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </aside>

  
    <main class="flex-1">
      
      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold">Dashboard</h1>
        <span class="text-gray-600">{{ profile?.email }}</span>
      </header>

     
      <section class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="bg-white rounded-xl shadow p-6 col-span-1">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
              {{ avatar }}
            </div>
            <div>
              <h3 class="font-semibold text-lg">{{ profile?.name || 'User' }}</h3>
              <p class="text-gray-500 text-sm">{{ profile?.role || 'Member' }}</p>
            </div>
          </div>
        </div>

        
        <div class="bg-white rounded-xl shadow p-6">
          <h4 class="text-gray-500">Projects</h4>
          <p class="text-3xl font-bold">12</p>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <h4 class="text-gray-500">Tasks</h4>
          <p class="text-3xl font-bold">34</p>
        </div>
      </section>
    </main>
  </div> -->
</template>

<script setup>
// import { ref, onMounted, computed } from 'vue'
// import { supabase } from '../supabase'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// const profile = ref(null)

// const avatar = computed(() =>
//   profile.value?.name ? profile.value.name.charAt(0).toUpperCase() : 'U'
// )

// onMounted(async () => {
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) {
//     router.push('/login')
//     return
//   }

//   const { data } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', user.id)
//     .single()

//   profile.value = data
// })

// const logout = async () => {
//   await supabase.auth.signOut()
//   router.push('/login')
// }
// import Sidebar from '@/components/sidebar.vue'
</script>
