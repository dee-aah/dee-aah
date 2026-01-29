<script setup>
import { supabase } from './supabase'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Main from '@/layouts/Main.vue'
import Empty from '@/layouts/Empty.vue'

const route = useRoute()
const layout = computed(() =>
  route.meta.layout === 'empty' ? Empty : Main
)
console.log(supabase)

</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
