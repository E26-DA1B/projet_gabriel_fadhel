<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Tache } from '../types/tache';

const props = defineProps<{
  tache: Tache;
}>();

const emit = defineEmits<{
  (e: 'supprimer', id: number): void;
  (e: 'deplacer', id: number, x: number, y: number): void;
}>();

const router = useRouter();

const estEnGlissement = ref<boolean>(false);
const positionX = ref<number>(0);
const positionY = ref<number>(0);
const departX = ref<number>(0);
const departY = ref<number>(0);

const demarrerGlissement = (event: PointerEvent): void => {
  const cible = event.target as { tagName?: string; setPointerCapture?: (id: number) => void };
  if (cible?.tagName === 'BUTTON') return;

  estEnGlissement.value = true;
  departX.value = event.clientX;
  departY.value = event.clientY;
  positionX.value = 0;
  positionY.value = 0;

  if (typeof cible?.setPointerCapture === 'function') {
    cible.setPointerCapture(event.pointerId);
  }
};

const deplacerCarte = (event: PointerEvent): void => {
  if (!estEnGlissement.value) return;
  positionX.value = event.clientX - departX.value;
  positionY.value = event.clientY - departY.value;
};

const relacherCarte = (event: PointerEvent): void => {
  if (!estEnGlissement.value) return;

  const distanceTotale = Math.abs(positionX.value) + Math.abs(positionY.value);

  if (distanceTotale < 5) {
    router.push(`/taches/${props.tache.id}`);
  } else {
    emit('deplacer', props.tache.id, event.clientX, event.clientY);
  }

  estEnGlissement.value = false;
  positionX.value = 0;
  positionY.value = 0;

  const cible = event.target as { releasePointerCapture?: (id: number) => void };
  if (typeof cible?.releasePointerCapture === 'function') {
    cible.releasePointerCapture(event.pointerId);
  }
};
</script>

<template>
  <div 
    class="card"
    :class="{ 'is-dragging': estEnGlissement }"
    :style="estEnGlissement ? { 
      transform: `translate(${positionX}px, ${positionY}px)`,
      zIndex: 9999,
      position: 'relative'
    } : {}"
    @pointerdown="demarrerGlissement"
    @pointermove="deplacerCarte"
    @pointerup="relacherCarte"
  >
    <div class="card-header">
      <span class="badge" :class="tache.priorite.toLowerCase()">{{ tache.priorite }}</span>
      <button 
        type="button"
        class="btn-danger" 
        @click.stop="emit('supprimer', tache.id)" 
        title="Supprimer la tâche"
      >
        ✕
      </button>
    </div>
    <h4>{{ tache.titre }}</h4>
    <p>{{ tache.description }}</p>
    <div class="card-footer">
      <small>📅 {{ tache.dateCreation }}</small>
    </div>
  </div>
</template>