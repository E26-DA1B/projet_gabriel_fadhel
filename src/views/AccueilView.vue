<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container hero-container">
    <div class="hero-card">
      <h1>Bienvenue sur <span>TasksBoard</span></h1>
      <p>Une application simple, rapide et locale de gestion de tâches.</p>
      <RouterLink to="/taches" class="btn btn-primary btn-large">
        Voir les tâches →
      </RouterLink>
    </div>
  </div>
</template>