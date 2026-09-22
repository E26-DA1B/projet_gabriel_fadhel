<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { donneesService } from '../services/donneesService';
import CarteTache from '../components/CarteTache.vue';
import type { Tache, StatistiquesTaches } from '../types/tache';

interface ZoneElement {
  getBoundingClientRect?: () => { left: number; right: number; top: number; bottom: number; height: number };
}

const taches = ref<Tache[]>([]);
const colonnes: string[] = ['À faire', 'En cours', 'Terminé'];

const stats = ref<StatistiquesTaches>({
  total: 0,
  aFaire: 0,
  enCours: 0,
  termine: 0
});

const recherche = ref<string>('');
const filtrePriorite = ref<string>('Toutes');
const triPar = ref<string>('date-desc');

const colonnesRefs = ref<Record<string, ZoneElement | null>>({});

const fixerRefColonne = (el: unknown, col: string) => {
  if (el) colonnesRefs.value[col] = el as ZoneElement;
};

const charger = async (): Promise<void> => {
  const [listeTaches, statsBackend] = await Promise.all([
    donneesService.obtenirTaches(),
    donneesService.obtenirStatistiques()
  ]);
  taches.value = listeTaches;
  stats.value = statsBackend;
};

const deplacerParCoordonnees = async (id: number, x: number, y: number): Promise<void> => {
  for (const col of colonnes) {
    const el = colonnesRefs.value[col];
    if (el?.getBoundingClientRect) {
      const rect = el.getBoundingClientRect();
      const dansAxeX = x >= rect.left && x <= rect.right;
      const dansAxeY = y >= rect.top && y <= (rect.bottom + 150);

      if (dansAxeX && dansAxeY) {
        await donneesService.changerStatut(id, col);
        await charger();
        return;
      }
    }
  }
};

const supprimer = async (id: number): Promise<void> => {
  await donneesService.supprimerTache(id);
  await charger();
};

const obtenirValeurStat = (colonne: string): number => {
  switch (colonne) {
    case 'À faire':
      return stats.value.aFaire;
    case 'En cours':
      return stats.value.enCours;
    case 'Terminé':
      return stats.value.termine;
    default:
      return 0;
  }
};

const tachesFiltreesEtTriees = computed<Tache[]>(() => {
  let resultat = [...taches.value];

  if (recherche.value.trim() !== '') {
    const query = recherche.value.toLowerCase();
    resultat = resultat.filter(t => 
      t.titre.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  }

  if (filtrePriorite.value !== 'Toutes') {
    resultat = resultat.filter(t => t.priorite === filtrePriorite.value);
  }

  const poidsPriorite: Record<string, number> = { 'Haute': 3, 'Moyenne': 2, 'Basse': 1 };

  resultat.sort((a, b) => {
    if (triPar.value === 'date-desc') {
      return new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime();
    }
    if (triPar.value === 'date-asc') {
      return new Date(a.dateCreation).getTime() - new Date(b.dateCreation).getTime();
    }
    if (triPar.value === 'prio-haute') {
      return (poidsPriorite[b.priorite] || 0) - (poidsPriorite[a.priorite] || 0);
    }
    if (triPar.value === 'prio-basse') {
      return (poidsPriorite[a.priorite] || 0) - (poidsPriorite[b.priorite] || 0);
    }
    return 0;
  });

  return resultat;
});

const obtenirTachesParColonne = (statut: string): Tache[] => {
  return tachesFiltreesEtTriees.value.filter(t => t.statut === statut);
};

onMounted(charger);
</script>

<template>
  <div class="container">
    <div class="header-section">
      <h2 class="page-title">Gestionnaire de tâches</h2>
    </div>

    <div class="stats-bar">
      <div class="stat-card">
        <span class="stat-value">{{ stats.total }}</span>
        <span class="stat-label">Total Tâches</span>
      </div>
      <div class="stat-card" v-for="col in colonnes" :key="col">
        <span class="stat-value">{{ obtenirValeurStat(col) }}</span>
        <span class="stat-label">{{ col }}</span>
      </div>
    </div>

    <div class="controls-bar">
      <div class="control-group search-group">
        <input 
          type="text" 
          v-model="recherche" 
          placeholder="Rechercher une tâche..." 
          class="control-input"
        />
      </div>

      <div class="control-group">
        <label>Priorité :</label>
        <select v-model="filtrePriorite" class="control-select">
          <option value="Toutes">Toutes</option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>
      </div>

      <div class="control-group">
        <label>Trier par :</label>
        <select v-model="triPar" class="control-select">
          <option value="date-desc">Plus récente</option>
          <option value="date-asc">Plus ancienne</option>
          <option value="prio-haute">Priorité (Haute → Basse)</option>
          <option value="prio-basse">Priorité (Basse → Haute)</option>
        </select>
      </div>
    </div>

    <div class="kanban-board">
      <div 
        v-for="col in colonnes" 
        :key="col" 
        :ref="(el) => fixerRefColonne(el, col)"
        class="column"
      >
        <div class="column-header">
          <h3>{{ col }}</h3>
          <span class="column-count">{{ obtenirTachesParColonne(col).length }}</span>
        </div>

        <CarteTache 
          v-for="tache in obtenirTachesParColonne(col)" 
          :key="tache.id" 
          :tache="tache"
          @deplacer="deplacerParCoordonnees"
          @supprimer="supprimer"
        />
        
        <div v-if="obtenirTachesParColonne(col).length === 0" class="empty-column">
          <small>Aucune tâche</small>
        </div>
      </div>
    </div>
  </div>
</template>