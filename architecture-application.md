# Architecture de l'application — TasksBoard

## 1. Identité du projet

* **Nom de l'application :** TasksBoard
* **Membres de l'équipe :** Fadhel Smari, Gabriel Cadieux
* **Public cible :** Développeurs et gestionnaires de projets personnels
* **Problème résolu :** Offre un gestionnaire de tâches visuel, fluide et 100 % local pour organiser ses activités et suivre l'avancement de ses projets personnels, sans création de compte ni abonnement.

---

## 2. Fonctionnalités essentielles

1. **La personne utilisatrice peut** consulter instantanément un tableau de tâches interactif divisé en colonnes de statut (*À faire*, *En cours*, *Terminée*) dès l'ouverture de l'application.
2. **La personne utilisatrice peut** ajouter, modifier, supprimer et déplacer des tâches d'une colonne à une autre grâce à un système de glisser-déposer (*drag-and-drop*).
3. **La personne utilisatrice peut** filtrer les tâches affichées selon leur niveau de priorité, leur statut ou effectuer une recherche par mot-clé au sein du tableau.
4. **La personne utilisatrice peut** consulter les statistiques globales des tâches mises à jour dynamiquement en temps réel.

---

## 3. Données principales

Une tâche possède un identifiant unique, un titre, une description facultative, un statut (*À faire*, *En cours*, *Terminée*), un niveau de priorité (*Basse*, *Moyenne*, *Haute*) et une date de création.

## 4. États ou catégories

- **Statut :** Représente l'état d'avancement d'une tâche (`AFaire`, `EnCours`, `Terminee`).
- **Priorité :** Représente le niveau d'urgence d'une tâche (`Basse`, `Moyenne`, `Haute`).

---

## 5. Écrans principaux

### Navigation globale (Barre de navigation - Navbar)
La barre de navigation est présente de manière permanente en haut de chaque écran pour assurer un déplacement fluide :
- **Ce que la personne verra :**
  - Le logo (titre) de l'application (« TasksBoard »).
  - Le menu de navigation principal avec deux liens d'accès direct (« Accueil », « Tableau »).
  - Un bouton d'action rapide d'une couleur distinctive (« + Créer une tâche »).
- **Les actions qu'elle pourra effectuer :**
  - Cliquer sur le logo ou sur « Accueil » pour retourner à la page de présentation.
  - Cliquer sur « Tableau » pour afficher le tableau des tâches.
  - Cliquer sur le bouton « + Créer une tâche » pour ouvrir directement le formulaire de création.
- **Les données qui devront être affichées :** Les éléments d'orientation et d'action globale.


### Écran 1 : Page d'accueil (`/`)
- **Ce que la personne verra :** Une carte de présentation de l'application avec un titre accrocheur, un texte expliquant le but de l'outil et un bouton d'action principal pour accéder directement au tableau de tâches.
- **Les actions qu'elle pourra effectuer :** Cliquer sur le bouton d'action pour naviguer vers le tableau des tâches.
- **Les données qui devront être affichées :** Les informations générales d'introduction de l'application.

### Écran 2 : Tableau des tâches (`/taches`)
- **Ce que la personne verra :**
  - Une barre de statistiques dynamiques affichant le nombre de tâches (total, à faire, en cours, terminées).
  - Une barre de contrôle contenant un champ de recherche par texte, un filtre par priorité et une option de tri.
  - Les 3 colonnes de statut (À faire, En cours, Terminée) contenant chacune leurs cartes de tâches interactives glissables.
- **Les actions qu'elle pourra effectuer :**
  - Glisser et déposer une carte de tâche pour changer son statut de colonne.
  - Taper un mot-clé dans la barre de recherche ou appliquer un filtre par priorité.
  - Cliquer sur une carte pour voir les détails ou accéder à sa modification.
  - Cliquer sur le bouton de suppression d'une carte.
- **Les données qui devront être affichées :**
  - Les indicateurs de statistiques calculés.
  - La liste des cartes de tâches (titre, description écourtée, badge de priorité, date de création).

### Écran 3 : Création d'une tâche (`/taches/nouvelle`)
- **Ce que la personne verra :**
  - Un en-tête avec sur-titre et titre de section.
  - Un formulaire structuré avec un champ pour le titre, une liste déroulante pour la priorité, une zone de texte pour la description, un bouton d'enregistrement et un bouton d'annulation.
- **Les actions qu'elle pourra effectuer :**
  - Saisir le titre et la description de la tâche.
  - Sélectionner une priorité dans la liste déroulante.
  - Soumettre le formulaire pour créer la tâche.
  - Cliquer sur « Annuler » pour retourner au tableau sans enregistrer.
- **Les données qui devront être affichées :** Les champs de saisie du formulaire préremplis avec les valeurs par défaut.

### Écran 4 : Modification d'une tâche (`/taches/:id/modifier`)
- **Ce que la personne verra :**
  - Un en-tête identifiant la tâche à modifier (ex. Tâche no X).
  - Le formulaire prérempli avec le titre, la priorité et la description actuels de la tâche.
  - Les boutons de sauvegarde et d'annulation.
- **Les actions qu'elle pourra effectuer :**
  - Modifier le titre, la priorité ou la description.
  - Soumettre les modifications.
  - Annuler l'opération et retourner à la vue précédente.
- **Les données qui devront être affichées :** Les données actuelles de la tâche sélectionnée.

### Écran 5 : Détail d'une tâche (`/taches/:id`)
- **Ce que la personne verra :**
  - La fiche complète de la tâche incluant son titre, son badge de priorité, son statut actuel, les dates enregistrées et sa description complète.
  - Les boutons d'action : modifier ou retourner à la liste.
- **Les actions qu'elle pourra effectuer :**
  - Cliquer sur « Modifier » pour ouvrir l'écran de modification.
  - Cliquer sur « Retour à la liste » pour revenir au tableau.
- **Les données qui devront être affichées :** L'ensemble des attributs et données détaillées de la tâche consultée.

---

## 6. Responsabilités du programme

| Ce que la personne voit | Règles et traitements | Données manipulées |
|---|---|---|
| Barre de recherche | Filtrer la liste des cartes selon le terme recherché | Tâches |
| Filtres et options de tri | Filtrer par priorité et ordonner par date ou priorité | Tâches |
| Barre de statistiques | Calculer en temps réel le nombre total et le compte par statut | Statistiques des tâches |
| Tableau interactif et cartes | Gérer le glisser-déposer (*drag-and-drop*) et le changement de statut | Tâches, Statut |
| Formulaire d'ajout / modification | Vérifier que le titre comporte au moins 2 caractères et valider la priorité sélectionnée | Champs de la tâche |
| Bouton d'enregistrement | Confirmer la création ou la modification d'une tâche | Données du formulaire |
| Bouton d'annulation | Annuler la saisie et rediriger vers le tableau | N/A |
| Bouton de suppression | Retirer définitivement une tâche de la collection | Tâche sélectionnée |

---

## 7. Limites de la première version

1. **Persistance multi-utilisateurs et comptes :** L'application ne gère pas la création de comptes d'utilisateurs ni l'authentification à distance ; elle fonctionne exclusivement en local sur la machine.
2. **Historique des modifications :** Aucun suivi historique détaillé ni journal des changements d'état (*activity log*) n'est conservé pour les tâches.

---

## Bilan du Frontend TP2

- **Vues réellement créées :**
  - Vue Accueil (`/` - `AccueilView.vue`)
  - Vue Tableau des tâches (`/taches` - `TachesView.vue`)
  - Vue Création de tâche (`/taches/nouvelle` - `NouvelleTacheView.vue`)
  - Vue Détail de tâche (`/taches/:id` - `TacheDetailsView.vue`)
  - Vue Modification de tâche (`/taches/:id/modifier` - `ModifierTacheView.vue`)
  - Vue Page introuvable (`/:pathMatch(.*)*` - `PageIntrouvableView.vue`)
- **Données simulées :**
  - Un tableau réactif d'objets `Tache` initialisé dans `src/services/donneesService.ts`.
- **Principales opérations du service frontend :**
  - `obtenirTaches()` : Retourne la liste complète des tâches.
  - `obtenirTacheParId(id)` : Recherche et retourne une tâche selon son identifiant unique.
  - `ajouterTache(demande)` : Génère un identifiant, attribue la date du jour et insère la nouvelle tâche avec un statut par défaut « À faire ».
  - `async modifierTache(id, DonneesFormulaireTache)` : Met à jour les propriétés modifiées d'une tâche existante.
  - `changerStatut(id, nouveauStatut)` : Met à jour la colonne de statut lors d'une action de glisser-déposer.
  - `supprimerTache(id)` : Retire une tâche du tableau simulé.
  - `obtenirResume()` : Calcule le total, le nombre de tâches par statut et le taux de complétion global.