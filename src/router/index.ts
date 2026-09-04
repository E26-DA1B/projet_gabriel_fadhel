import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import AccueilView from '../views/AccueilView.vue';
import TacheDetailsView from '../views/TacheDetailsView.vue';



const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'accueil', component: AccueilView },
{ path: '/taches/:id', name: 'detail-tache', component: TacheDetailsView },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;