import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('../views/LibraryView.vue'),
    },
    {
      path: '/library/:id',
      name: 'card-detail',
      component: () => import('../views/CardDetailView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
