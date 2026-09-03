<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationPrincipale from './components/NavigationPrincipale.vue';
</script>

<template>
  <NavigationPrincipale />
  <main>
    <RouterView />
  </main>
</template>