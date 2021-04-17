import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Registration from '../views/Registration.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
