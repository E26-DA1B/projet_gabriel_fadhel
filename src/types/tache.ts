export interface Tache {
  id: number;
  titre: string;
  description: string;
  statut: string;
  priorite: string;
  dateCreation: string;
}

export type DonneesFormulaireTache = Omit<Tache, 'id' | 'statut' | 'dateCreation'>;