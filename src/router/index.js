import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:8000'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// store.dispatch('auth/initAuth').then(() => {
//     const user = store.getters['user/user']
//
//     if (router.history.current.name !== 'example' && user)
//         router.push('').catch(console.log)
// })
//
// router.beforeEach((to, from, next) => {
//     const isAuth = store.getters['auth/isAuth']
//     const user = store.getters['user/user']
//
//     if (to.matched.some(route => route.meta.auth)) {
//         if (!isAuth && user) next({ name: 'login' })
//     } else next({ name: to.meta.name })
// })

export default router
