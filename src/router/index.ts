import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import AccueilView from '../views/AccueilView.vue';
import TacheDetailsView from '../views/TacheDetailsView.vue';
import TachesView from '../views/TachesView.vue';
import NouvelleTacheView from '../views/NouvelleTacheView.vue';
import PageIntrouvableView from '../views/PageIntrouvableView.vue';
import ModifierTacheView from '../views/ModifierTacheView.vue';




const routes: Array<RouteRecordRaw> = [
{ path: '/', name: 'accueil', component: AccueilView },
{ path: '/taches/:id', name: 'detail-tache', component: TacheDetailsView },
{ path: '/taches', name: 'taches', component: TachesView },
{ path: '/taches/nouvelle', name: 'nouvelle-tache', component: NouvelleTacheView },
{ path: '/:pathMatch(.*)*', name: 'page-introuvable', component: PageIntrouvableView },
{ path: '/taches/:id/modifier', name: 'modifier-tache', component: ModifierTacheView }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;