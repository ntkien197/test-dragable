import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        alias: '/',
        name: 'admin',
        component: () => import('@/views/admin/index.vue')
    },
    {
        path: '/consumer',
        name: 'consumer',
        component: () => import('@/views/client/index')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
