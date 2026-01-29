import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import { supabase } from '../supabase'

const routes = [
  
  {
    path: '/login',
    component: Login,
    meta: { layout: 'empty' } 
  },
  {
    path: '/register',
    component: Register,
    meta: { layout: 'empty' } 
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getUser()
  const isLogin = !!data.user

  if (to.meta.requiresAuth && !isLogin) {
    next('/login')
  } else {
    next()
  }
})

export default router
