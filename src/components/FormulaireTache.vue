<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { DonneesFormulaireTache } from '../types/tache';

const props = withDefaults(
  defineProps<{
    valeurInitiale?: DonneesFormulaireTache;
    texteBouton?: string;
  }>(),
  {
    valeurInitiale: undefined,
    texteBouton: 'Enregistrer',
  }
);

const emit = defineEmits<{
  soumettre: [donnees: DonneesFormulaireTache];
  annuler: [];
}>();

function valeursParDefaut(): DonneesFormulaireTache {
  return {
    titre: '',
    description: '',
    priorite: 'Basse',
  };
}

const formulaire = reactive<DonneesFormulaireTache>({
  ...valeursParDefaut(),
  ...props.valeurInitiale,
});

const erreurs = ref<string[]>([]);

function valider(): boolean {
  const nouvellesErreurs: string[] = [];

  if (formulaire.titre.trim().length < 2) {
    nouvellesErreurs.push('Le titre doit contenir au moins deux caractères.');
  }

  erreurs.value = nouvellesErreurs;
  return nouvellesErreurs.length === 0;
}

function soumettre(): void {
  if (!valider()) {
    return;
  }

  emit('soumettre', {
    titre: formulaire.titre.trim(),
    description: formulaire.description.trim(),
    priorite: formulaire.priorite,
  });
}
</script>

<template>
  <form class="formulaire-pret" novalidate @submit.prevent="soumettre">
    <div v-if="erreurs.length > 0" class="message message-erreur" role="alert">
      <strong>Le formulaire contient des erreurs.</strong>
      <ul>
        <li v-for="erreur in erreurs" :key="erreur">{{ erreur }}</li>
      </ul>
    </div>

    <div class="grille-formulaire">
      <div class="champ champ-large">
        <label for="titre">Titre de la tâche</label>
        <input
          id="titre"
          v-model="formulaire.titre"
          type="text"
          placeholder="Ex. Implémenter l'authentification"
        />
      </div>

      <div class="champ champ-large">
        <label for="priorite">Priorité</label>
        <select id="priorite" v-model="formulaire.priorite">
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
      </div>

      <div class="champ champ-large">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="formulaire.description"
          rows="4"
          placeholder="Information complémentaire facultative"
        ></textarea>
      </div>
    </div>

    <div class="actions-formulaire">
      <button 
        type="button" 
        class="bouton bouton-secondaire" 
        @click="emit('annuler')"
      >
        Annuler
      </button>
      <button class="bouton bouton-principal" type="submit">
        {{ texteBouton }}
      </button>
    </div>
  </form>
</template>