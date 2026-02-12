import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import { supabase } from '../supabase'
import { DotLottie } from '@lottiefiles/dotlottie-web';
import Main from '../layouts/Main.vue'
import Messages from '../views/Messages.vue'
import Finance from '../views/Finance.vue' 

  
const routes = [
  
  {
    path: '/login',
    component: Login,
    meta: { layout: 'Empty' } 
  },
  {
    path: '/register',
    component: Register,
    meta: { layout: 'Empty' } 
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/Portfolio',
    component: () => import('@/views/Portfolio.vue')
  },
  {
    path: '/About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/Contact',
    component: () => import('@/views/Contact.vue')
  },{
    path: '/laporan-keuangan',
    name: 'PublicFinance',
    component: () => import('../views/PublicFinance.vue'), // atau component: PublicFinance
    meta: { 
      layout: 'Empty' // <--- GANTI INI (Supaya Navbar utama hilang)
    }
  },
  {
    path: '/dashboard',
    component: Dashboard, 
    meta: { 
            requiresAuth: true,
            layout : 'Dashboard'
          } 
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages, 
    meta: { 
            requiresAuth: true,
            layout : 'Dashboard'
          } 
  },
{
    path: '/finance',
    name: 'Finance',
    component: Finance,
    meta: { 
      requiresAuth: true, 
      layout: 'Dashboard' 
    }
  },
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

const dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas'),
    src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie", 
});
export default router
