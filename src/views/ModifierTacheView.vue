<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { donneesService } from '../services/donneesService';
import FormulaireTache from '../components/FormulaireTache.vue';
import type { Tache, DonneesFormulaireTache } from '../types/tache';

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

const enregistrer = async (donnees: DonneesFormulaireTache): Promise<void> => {
  if (!tache.value) return;

  await donneesService.modifierTache(tache.value.id, donnees);
  
  router.push(`/taches/${tache.value.id}`);
};

const annuler = (): void => {
  if (tache.value) {
    router.push(`/taches/${tache.value.id}`);
  } else {
    router.push('/taches');
  }
};
</script>

<template>
  <section v-if="tache" class="page page-etroit">
    <header>
      <h1>Modifier la tâche</h1>
      <p class="texte-secondaire">Mettez à jour les informations nécessaires.</p>
    </header>

    <FormulaireTache 
      :valeur-initiale="{
        titre: tache.titre,
        description: tache.description,
        priorite: tache.priorite
      }" 
      texte-bouton="Enregistrer les changements"
      @soumettre="enregistrer" 
      @annuler="annuler" 
    />
  </section>

  <section v-else class="page page-etroit etat-vide">
    <span class="code-erreur">404</span>
    <h1>Tâche introuvable</h1>
    <p>Impossible de modifier une tâche qui n'existe pas.</p>
    <RouterLink class="bouton bouton-principal" to="/taches">
      Retour au tableau
    </RouterLink>
  </section>
</template>