<script setup lang="ts">
import { useRouter } from 'vue-router';
import { donneesService } from '../services/donneesService';
import FormulaireTache from '../components/FormulaireTache.vue';
import type { DonneesFormulaireTache } from '../types/tache';

const router = useRouter();

const ajouter = async (donnees: DonneesFormulaireTache): Promise<void> => {
  await donneesService.ajouterTache(donnees);
  router.push('/taches');
};

const annuler = (): void => {
  router.push('/taches');
};
</script>

<template>
  <section class="page page-etroit">
    <header>
      <p class="etiquette">Nouvelle tâche</p>
      <h1>Créer une tâche</h1>
      <p class="texte-secondaire">
        Saisissez les détails de votre tâche et ajustez sa priorité pour ajouter la tâche.
      </p>
    </header>

    <FormulaireTache 
      texte-bouton="Créer la tâche"
      @soumettre="ajouter" 
      @annuler="annuler" 
    />
  </section>
</template>