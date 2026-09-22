<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { donneesService } from '../services/donneesService';
import type { Tache } from '../types/tache';

const route = useRoute();
const router = useRouter();
const tache = ref<Tache | null>(null);

onMounted(async () => {
  const idTache = Number(route.params.id);
  
  const trouvee = await donneesService.obtenirTacheParId(idTache);

  if (trouvee) {
    tache.value = trouvee;
  } else {
    router.push('/taches');
  }
});
</script>

<template>
  <div class="container detail-container" v-if="tache">
    <div class="view-card">
      <div class="view-card-header">
        <div class="header-badge-group">
          <span class="badge" :class="tache.priorite.toLowerCase()">
            {{ tache.priorite }}
          </span>
          <span class="status-pill">{{ tache.statut }}</span>
        </div>
        <span class="meta-date">Créée le : {{ tache.dateCreation }}</span>
      </div>

      <div class="view-card-body">
        <h1 class="task-title">{{ tache.titre }}</h1>
        
        <div class="description-block">
          <label class="block-label">Description</label>
          <p class="description-text">
            {{ tache.description || 'Aucune description fournie pour cette tâche.' }}
          </p>
        </div>
      </div>

      <div class="view-card-footer">
        <button class="btn btn-secondary" @click="router.push('/taches')">
          ← Retour au tableau
        </button>
        <button class="btn btn-primary" @click="router.push(`/taches/${tache.id}/modifier`)">
          Modifier la tâche
        </button>
      </div>
    </div>
  </div>
</template>