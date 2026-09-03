<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="navbar">
    <div class="logo">
      <RouterLink :to="{ name: 'accueil' }">
        TasksBoard
      </RouterLink>
    </div>

    <nav class="nav-links" aria-label="Navigation principale">
      <RouterLink :to="{ name: 'accueil' }">Accueil</RouterLink>
      <RouterLink :to="{ name: 'taches' }">Tâches</RouterLink>
      <RouterLink class="btn-nav" :to="{ name: 'nouvelle-tache' }">
        + Créer une tâche
      </RouterLink>
    </nav>
  </header>
</template>