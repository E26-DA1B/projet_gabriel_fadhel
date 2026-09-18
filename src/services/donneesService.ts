import { invoke } from "@tauri-apps/api/core";
import type { 
  Tache, 
  NouvelleTacheDemande, 
  ModifierTacheDemande, 
  StatistiquesTaches, 
  DonneesFormulaireTache 
} from "../types/tache";

export const donneesService = {
  async obtenirTaches(): Promise<Tache[]> {
    return await invoke<Tache[]>("lister_taches");
  },

  async obtenirTacheParId(id: number): Promise<Tache | undefined> {
    const taches = await this.obtenirTaches();
    return taches.find((t) => t.id === id);
  },

  async obtenirStatistiques(): Promise<StatistiquesTaches> {
    return await invoke<StatistiquesTaches>("obtenir_statistiques");
  },

  async ajouterTache(demande: NouvelleTacheDemande): Promise<Tache> {
    return await invoke<Tache>("ajouter_tache", { demande });
  },

  async modifierTache(id: number, donnees: DonneesFormulaireTache): Promise<Tache> {
    const demande: ModifierTacheDemande = { id, ...donnees };
    return await invoke<Tache>("modifier_tache", { demande });
  },

  async changerStatut(id: number, statut: string): Promise<Tache> {
    return await invoke<Tache>("changer_statut", { id, statut });
  },

  async supprimerTache(id: number): Promise<boolean> {
    return await invoke<boolean>("supprimer_tache", { id });
  }
};