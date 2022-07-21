import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Login from '../views/login/Login'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})
export default router;