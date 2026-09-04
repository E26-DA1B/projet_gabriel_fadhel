import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import AccueilView from '../views/AccueilView.vue';



const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'accueil', component: AccueilView },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;