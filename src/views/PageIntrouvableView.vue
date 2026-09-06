<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="container hero-container">
    <div class="hero-card">
      <h1>404</h1>
      <p>Oups ! La page que vous cherchez n'existe pas.</p>
      <RouterLink to="/" class="btn btn-primary">
        Retour à l'accueil
      </RouterLink>
    </div>
  </div>
</template>