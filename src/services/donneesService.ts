import type { Tache, DonneesFormulaireTache } from '../types/tache';

let tachesSimulees: Tache[] = [
  {
    id: 1,
    titre: 'Implémenter l\'authentification JWT',
    description: 'Sécuriser les endpoints de l\'API avec des jetons JWT et gérer le rafraîchissement des tokens.',
    statut: 'À faire',
    priorite: 'Basse',
    dateCreation: '2026-08-20'
  },
  {
    id: 2,
    titre: 'Optimiser les requêtes SQL',
    description: 'Ajouter des index sur la base de données PostgreSQL pour accélérer les temps de réponse des services.',
    statut: 'À faire',
    priorite: 'Haute',
    dateCreation: '2026-08-22'
  },
  {
    id: 3,
    titre: 'Configurer le pipeline CI/CD',
    description: 'Mettre en place les GitHub Actions pour automatiser les tests unitaires et le déploiement continu.',
    statut: 'En cours',
    priorite: 'Moyenne',
    dateCreation: '2026-08-25'
  },
  {
    id: 4,
    titre: 'Mettre en cache les endpoints REST',
    description: 'Intégrer une instance Redis pour limiter les appels répétés aux services externes.',
    statut: 'En cours',
    priorite: 'Haute',
    dateCreation: '2026-08-26'
  },
  {
    id: 5,
    titre: 'Containeriser le microservice',
    description: 'Rédiger le Dockerfile et le fichier docker-compose pour l\'environnement de staging.',
    statut: 'Terminé',
    priorite: 'Moyenne',
    dateCreation: '2026-08-15'
  },
  {
    id: 6,
    titre: 'Rédiger la spécification OpenAPI',
    description: 'Générer la documentation Swagger pour exposer les contrats d\'API aux clients.',
    statut: 'Terminé',
    priorite: 'Basse',
    dateCreation: '2026-08-10'
  }
];

export const donneesService = {

  async obtenirTaches(): Promise<Tache[]> {
    return [...tachesSimulees];
  },

  async obtenirTacheParId(id: number): Promise<Tache | undefined> {
    const tache = tachesSimulees.find(t => t.id === id);
    return tache ? { ...tache } : undefined;
  },

  async ajouterTache(donnees: DonneesFormulaireTache): Promise<Tache> {
    const nouveauId = tachesSimulees.length > 0 
      ? Math.max(...tachesSimulees.map(t => t.id)) + 1 
      : 1;

    const nouvelleTache: Tache = {
      id: nouveauId,
      titre: donnees.titre,
      description: donnees.description || '',
      statut: 'À faire',
      priorite: donnees.priorite || 'Moyenne',
      dateCreation: new Date().toISOString().split('T')[0]
    };

    tachesSimulees.push(nouvelleTache);
    return { ...nouvelleTache };
  },

  async changerStatut(id: number, nouveauStatut: string): Promise<boolean> {
    const tache = tachesSimulees.find(t => t.id === id);
    if (!tache) return false;

    tache.statut = nouveauStatut;
    return true;
  },

  async supprimerTache(id: number): Promise<boolean> {
    const longueurInitiale = tachesSimulees.length;
    tachesSimulees = tachesSimulees.filter(t => t.id !== id);
    return tachesSimulees.length < longueurInitiale;
  },

  async obtenirResume() {
    const total = tachesSimulees.length;
    const aFaire = tachesSimulees.filter(t => t.statut === 'À faire').length;
    const enCours = tachesSimulees.filter(t => t.statut === 'En cours').length;
    const termine = tachesSimulees.filter(t => t.statut === 'Terminé').length;

    return {
      total,
      aFaire,
      enCours,
      termine,
      tauxCompletion: total > 0 ? Math.round((termine / total) * 100) : 0
    };
  }
}