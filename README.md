# TasksBoard — Gestionnaire de Tâches Interactive

**TasksBoard** est une application de bureau moderne et réactive conçue pour faciliter l'organisation et le suivi dynamique de projets. Construite avec **Vue 3** et encapsulée via **Tauri 2**, elle offre un tableau de bord interactif inspiré de la méthode Kanban avec glisser-déposer (*drag-and-drop*), un système complet de gestion des tâches ainsi que des statistiques calculées en temps réel.

---

## Équipe de développement et dépot GitHub

* **Membres de l'équipe :**
  - Fadhel Smari
  - Gabriel Cadieux
* **Dépôt GitHub :** https://github.com/E26-DA1B/projet_gabriel_fadhel
* **Version de la remise :** TP2 (`tag: tp2`)

---

## Description du besoin

Dans le cadre d'un projet académique ou personnel, la gestion du temps et l'ordonnancement des tâches sont essentiels pour respecter les échéances. **TasksBoard** répond au besoin central de visualité et de fluidité dans le suivi des priorités. L'application résout la complexité des outils lourds en proposant une interface fluide, épurée et sans distraction, permettant de créer, mettre à jour, catégoriser et déplacer ses tâches intuitivement.

---

## Fonctionnalités principales (TP2 — Version Frontend)

### 1. Tableau de tâches interactif avec glisser-déposer (*Drag-and-Drop*)
* **Organisation visuelle :** Présentation des tâches en 3 colonnes de statut distinctes (*À faire*, *En cours*, *Terminée*).
* **Cartes interactives :** Chaque tâche est représentée par une carte incluant titre, description écourtée, badge de priorité et date de création.
* **Glisser-déposer fluide :** Déplacement direct et intuitif des cartes entre les colonnes avec réorganisation automatique de l'état des tâches.

### 2. Statistiques dynamiques et calculées en temps réel
* **Indicateurs clés de performance :** Calcul automatique et instantané du nombre total de tâches, du nombre de tâches à faire, en cours et terminées.
* **Mise à jour en direct :** Le tableau de bord ajuste ses métriques à chaque fois qu'une tâche est ajoutée, modifiée, supprimée ou déplacée d'une colonne à une autre.

### 3. Recherche, filtrage et tri poussés
* **Recherche textuelle :** Filtrage instantané des cartes selon les termes saisis dans la barre de recherche.
* **Filtres par priorité :** Possibilité d'isoler les tâches selon leur niveau (*Basse*, *Moyenne*, *Haute*).
* **Tri dynamique :** Ordonnancement par date de création ou par niveau de priorité.

### 4. Navigation fluide & Vues distinctes
L'application intègre **3 vues principales** gérées par Vue Router :
1. **Accueil / Tableau de bord (`/`) :** Présentation de l'application et accès rapide aux fonctionnalités.
2. **Tableau des tâches (`/taches`) :** Vue Kanban principale avec cartes glissables, recherche et barre de statistiques.
3. **Formulaire de création (`/taches/nouvelle`) & modification (`/taches/:id/modifier`) :** Interfaces épurées pour ajouter ou mettre à jour les détails d'une tâche.

### 5. Formulaire complet et validation stricte
* **Contrôle des saisies :** Validation côté client (longueur minimale du titre, sélection requise de la priorité).
* **Messages d'erreur contextuels :** Alertes visuelles explicites en cas de saisie invalide ou d'échec d'opération.
* **Confirmation et retour :** Retour d'information immédiat lors de la confirmation ou de la suppression d'une tâche.

---

## Technologies utilisées

* **Framework Frontend :** [Vue 3](https://vuejs.org/) (Composition API avec `<script setup lang="ts">`)
* **Framework Desktop :** [Tauri 2](https://v2.tauri.app/)
* **Langage & Outillage :** TypeScript, HTML5, CSS3
* **Routage :** Vue Router
* **Gestionnaire de paquets :** npm

---

## Architecture des données & Services

Pendant cette phase du TP2, les données sont simulées et gérées par une couche de service JavaScript/TypeScript isolée (`src/services/donneesService.ts`). 

Cette architecture garantit la séparation des responsabilités : les composants Vue n'interagissent pas directement avec la mémoire globale, mais passent exclusivement par le service. Cette couche préparatoire simplifiera l'intégration du backend Rust et des commandes Tauri lors du TP3.

---

## Prérequis

Avant de pouvoir exécuter le projet, assurez-vous d'avoir installé sur votre machine :

* **Node.js** (version 18 ou supérieure)
* **npm** (inclus avec Node.js)
* **Rust & Cargo** (nécessaires pour le démarrage de Tauri)
* **Préréquis système Tauri 2** (dépendances C++ / système selon votre OS)

---

## Installation et exécution

### 1. Cloner le dépôt Git
   ```bash
   git clone https://github.com/E26-DA1B/projet_gabriel_fadhel
   cd projet_gabriel_fadhel
   ```

### 2. Installer les dépendances
   ```bash
   npm install
   ```

### 3. Lancer l'application en mode développement (Tauri + Vue)
   ```bash
   npm run tauri dev
   ```

### 4. Compiler le projet (Validation Build)
   ```bash
   npm run build
   cargo check --manifest-path src-tauri/Cargo.toml
   npm run tauri dev
   ```

## Répartition du travail (TP2)

### Fadhel Smari
* **Configuration & Structure :** Initialisation du projet (Vue 3, TypeScript, Tauri v2), configuration de Vite et mise en place du dépôt GitHub.
* **Typage & Modélisation :** Création du type utilitaire `DonneesFormulaireTache` dans `types/tache.ts`.
* **Services & Logique Métier :** Implémentation des méthodes CRUD avancées et du calcul dynamique des statistiques dans `services/donneesService.ts`.
* **Composants & Vues :** Développement de `CarteTache.vue`, `TachesView.vue` (tableau Tâches, recherche, tri, filtres, stats), `ModifierTacheView.vue` et `PageIntrouvableView.vue`.
* **Routage :** Configuration des routes pour le tableau, la modification et la page d'erreur dans `router/index.ts`.
* **Styles CSS :** Intégration du style visuel pour `CarteTache` et le tableau `TachesView`.

### Gabriel Cadieux
* **Modélisation de Données :** Définition de l'interface principale `Tache` dans `types/tache.ts`.
* **Services & Données Initiales :** Mise en place du jeu de données fictif (6 tâches) et des méthodes `obtenirTaches` et `obtenirTacheParId` dans `services/donneesService.ts`.
* **Composants & Vues :** Développement des composants `NavigationPrincipale.vue` et `FormulaireTache.vue`, ainsi que des vues `AccueilView.vue`, `TacheDetailsView.vue` et `NouvelleTacheView.vue`.
* **Routage :** Définition des routes d'accueil, de détail et de création dans `router/index.ts`.
* **Intégration & Démarrage :** Assemblage de la navigation principale dans `App.vue` et initialisation globale de l'application (Vue, Vue Router, styles) dans `main.ts`.
* **Styles CSS :**  Intégration du style visuel pour les formulaires, la barre de navigation, la vue d'accueil et la vue détaillée.

## Limites et fonctionnalités incomplètes connues

* **Persistance des données temporaire :** Les données sont stockées uniquement en mémoire (RAM) via le service de simulation. Un redémarrage ou un rafraîchissement complet de l'application réinitialise les tâches à leur état par défaut.
* **Absence de base de données :** Le projet n'intègre pas encore de base de données (comme SQLite) pour enregistrer les modifications sur le disque dur de l'utilisateur.