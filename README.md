# TasksBoard — Gestionnaire de Tâches Interactive

**TasksBoard** est une application de bureau moderne et réactive conçue pour faciliter l'organisation et le suivi dynamique de projets. Construite avec **Vue 3** et encapsulée via **Tauri 2**, elle offre un tableau de bord interactif inspiré de la méthode Kanban avec glisser-déposer (*drag-and-drop*), un système complet de gestion des tâches ainsi que des statistiques calculées en temps réel.

---

## Équipe de développement et dépot GitHub

* **Membres de l'équipe :**
  - Fadhel Smari
  - Gabriel Cadieux
* **Dépôt GitHub :** https://github.com/E26-DA1B/projet_gabriel_fadhel
* **Version de la remise :** TP2 (`tag: tp3`)

---

## Description du besoin

Dans le cadre d'un projet académique ou personnel, la gestion du temps et l'ordonnancement des tâches sont essentiels pour respecter les échéances. **TasksBoard** répond au besoin central de visualité et de fluidité dans le suivi des priorités. L'application résout la complexité des outils lourds en proposant une interface fluide, épurée et sans distraction, permettant de créer, mettre à jour, catégoriser et déplacer ses tâches intuitivement.

---

## Principales fonctionnalités (TP3 — Version Backend & Frontend finale)

### 1. Backend Rust performant & Commandes Tauri
* **Architecture modulaire :** Séparation claire des responsabilités côté backend avec des modules Rust dédiés (`modeles.rs`, `base_donnees.rs`, `commandes.rs`, `lib.rs`).
* **Communication frontend-backend :** Exposé des opérations backend au frontend Vue 3 via des commandes Tauri asynchrones (`#[tauri::command(async)]`).
* **Gestion robuste des erreurs :** Traitement des exceptions avec le type `Result<T, String>` de Rust, garantissant qu'aucune erreur système ne fait planter l'application et qu'un message explicite est retourné au frontend.

### 2. Persistance locale des données (JSON)
* **Sauvegarde automatique :** Enregistrement de l'état des tâches dans un fichier JSON (`taches.json`) stocké de façon sécurisée dans le dossier de données utilisateur de l'application (`app_data_dir`).
* **Persistance entre les sessions :** Conservation intégrale des ajouts, modifications, changements de statut et suppressions après la fermeture et le redémarrage de l'application.
* **Génération dynamique des identifiants :** Attribution automatique d'un ID unique en millisecondes (`UNIX_EPOCH`) et horodatage automatique de la date de création avec la bibliothèque `chrono`.

### 3. Tableau Kanban interactif avec glisser-déposer (*Drag-and-Drop*)
* **Organisation visuelle :** Présentation des tâches réparties en 3 colonnes de statut distinctes (*À faire*, *En cours*, *Terminé*).
* **Déplacement fluide :** Glisser-déposer interactif des cartes modifiant directement le statut de la tâche en backend via la commande `changer_statut`.
* **Cartes informatives :** Affichage du titre, de la description, du badge de priorité (*Basse*, *Moyenne*, *Haute*) et de la date de création.

### 4. Traitement backend & Statistiques calculées en temps réel
* **Agrégation côté Rust :** Calcul dynamique du nombre total de tâches ainsi que du décompte par statut (*À faire*, *En cours*, *Terminé*) effectué directement dans le backend Rust via `obtenir_statistiques`.
* **Mise à jour en direct :** Ajustement instantané des indicateurs du tableau de bord après chaque opération CRUD ou changement d'état.

### 5. Recherche, filtrage et tri dynamiques
* **Recherche textuelle :** Filtrage instantané sur les titres et descriptions des tâches.
* **Filtre par priorité :** Isolation des tâches selon leur niveau de priorité.
* **Tri multi-critères :** Ordonnancement chronologique (plus récente / plus ancienne) ou par niveau de priorité (Haute → Basse ou Basse → Haute).

### 6. Navigation complète & Validation des formulaires
* **Navigation multi-vues :** Navigation fluide gérée par Vue Router (Accueil, Tableau Kanban, Formulaire de création, Vue détaillée, Formulaire de modification, Page 404).
* **Double validation :** Validation préventive des champs côté client (longueur du titre, sélection de priorité) couplée à la validation et sérialisation/désérialisation stricte par Serde côté Rust.

---

## Technologies utilisées

## Technologies utilisées

* **Backend Rust & Intégration Desktop :**
  * **Rust** — Langage système performant et sécurisé utilisé pour la logique métier et la gestion des données.
  * **Tauri** — Framework de bureau léger assurant l'encapsulation de l'application et la communication inter-processus via `invoke`.
  * **Serde** (`serde` / `serde_json`) — Sérialisation et désérialisation des structures Rust pour les échanges JSON avec le frontend.
  * **Chrono** — Gestion des horodatages et formatage des dates de création des tâches.

* **Frontend Vue 3 :**
  * **Vue 3** — Framework réactif utilisant la Composition API (`<script setup lang="ts">`).
  * **TypeScript** — Typage statique strict garantissant la fiabilité du code.
  * **Vue Router 4** — Gestion du routage et de la navigation monopage (SPA).
  * **HTML5 & CSS3** — Interface utilisateur fluide, responsive et sans dépendances lourdes.

* **Outillage & Gestionnaire de paquets :**
  * **npm** — Gestionnaire de dépendances JavaScript/Node.js.
  * **Cargo** — Gestionnaire de paquets et outil de compilation pour Rust.

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

---

## Persistance des données (TP3)

Le stockage local s'appuie sur un fichier au format **JSON** nommé `taches.json`, géré par le backend Rust. Le fichier est automatiquement créé et conservé sur le disque dans le dossier de données propre à l'application (`app_data_dir`), garantissant la persistance des tâches et des statistiques après chaque fermeture.

---

## Répartition du travail (TP3 — Backend & Intégration)

### Fadhel Smari
* **Persistance des données (`base_donnees.rs`) :** Implémentation de la lecture/écriture JSON et de la gestion CRUD persistante.
* **Calcul des statistiques :** Implémentation du calcul dynamique des métriques (`total`, `a_faire`, `en_cours`, `termine`) côté Rust.
* **Gestion des dates :** Intégration de la dépendance `chrono` pour l'horodatage automatique lors de la création d'une tâche.
* **Typage TypeScript & Interfaces :** Définition des structures de formulaires(`DonneesFormulaireTache`), des requêtes backend (`NouvelleTacheDemande`, `ModifierTacheDemande`) et des métriques (`StatistiquesTaches`).
* **Liaison Frontend-Backend (`donneesService.ts`) :** Remplacement des données simulées par l'intégration des appels Tauri `invoke()`.

### Gabriel Cadieux
* **Modèles de données (`modeles.rs`) :** Définition des structures Rust avec sérialisation et désérialisation `serde` en `camelCase`.
* **Exposition des commandes (`commandes.rs`) :** Création des fonctions asynchrones exposées au frontend via `#[tauri::command(async)]`.
* **Point d'entrée backend (`lib.rs` / `main.rs`) :** Structuration de l'architecture modulaire et enregistrement des handlers Tauri.
* **Intégration du service asynchrone :** Mise à jour de la récupération directe des tâches et détails dans les vues de consultation.
* **Affichage des statistiques backend :** Adaptation de la barre de métriques de `TachesView` pour consommer les données calculées par Rust.

---

## Limites et fonctionnalités incomplètes connues

* **Statut et stabilité de l'application :** L'application est pleinement fonctionnelle, stable et ne présente aucun bug connu. Elle répond à l'ensemble des exigences du cahier des charges du TP3.
* **Gestion des erreurs et exceptions :** La gestion des erreurs est assurée côté backend Rust sur l'ensemble des opérations. Le frontend Vue effectue quant à lui la validation en amont des données saisies, garantissant ainsi une expérience utilisateur fluide sans plantage inattendu.

### Pistes d'améliorations futures
Si l'application venait à évoluer dans de futures versions, les ajouts suivants pourraient être envisagés :
* **Migration vers une base de données relationnelle :** Remplacer le stockage par fichier `taches.json` par une base de données intégrée comme **SQLite** afin d'optimiser les performances lors de la gestion d'un volume massif de tâches.
* **Historique des activités :** Ajouter un journal d'historique permettant de consulter l'ensemble des actions effectuées (création, modifications, changements de statut, suppressions) avec leurs dates et heures précises.
* **Sous-tâches et étiquettes personnalisées :** Offrir la possibilité d'ajouter des étiquettes (*tags*) personnalisées et de découper une tâche principale en sous-tâches (checklists).