export interface Tache {
  id: number;
  titre: string;
  description: string;
  statut: string;
  priorite: string;
  dateCreation: string;
}

export interface NouvelleTacheDemande {
  titre: string;
  description: string;
  priorite: string;
}

export interface ModifierTacheDemande {
  id: number;
  titre: string;
  description: string;
  priorite: string;
}

export interface DonneesFormulaireTache {
  titre: string;
  description: string;
  priorite: string;
}

export interface StatistiquesTaches {
  total: number;
  aFaire: number;
  enCours: number;
  termine: number;
}