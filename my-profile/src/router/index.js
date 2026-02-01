import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import { supabase } from '../supabase'
import { DotLottie } from '@lottiefiles/dotlottie-web';

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
  },
  {
    path: '/Portfolio',
    component: () => import('@/views/Portfolio.vue')
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

const dotLottie = new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.querySelector('#dotlottie-canvas'),
    src: "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie", // or .json file
});
export default router
