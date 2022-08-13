import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/else',
    name: 'else',
    component: () => import(/* webpackChunkName: "else" */ '../views/ElseView.vue')
  },
  {
    path: '/tasks/:id',
    name: 'task',
    component: () => import(/* webpackChunkName: "task" */ '../views/TaskDetails.vue'),
    props: route => ({...route.params, id: parseInt(route.params.id)}),
    beforeEnter: (to, from) => {
      if (window.localStorage.getItem('tasksList')) {
        const content = JSON.parse(window.localStorage.getItem('tasksList'))
        const exist = content.find(task => task.id === parseInt(to.params.id))
        if(!exist) return {name: 'NotFound'}
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve) => {
      setTimeout(() => resolve({ x: 0, y: 0 }), 500)
    })
  }
})

export default router
