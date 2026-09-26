use crate::base_donnees;
use crate::modeles::{ModificationTache, NouvelleTache, StatistiquesTaches, Tache};
use tauri::AppHandle;

#[tauri::command(async)]
pub fn lister_taches(app: AppHandle) -> Result<Vec<Tache>, String> {
    base_donnees::lister_taches(&app)
}

#[tauri::command(async)]
pub fn obtenir_statistiques(app: AppHandle) -> Result<StatistiquesTaches, String> {
    base_donnees::obtenir_statistiques(&app)
}

#[tauri::command(async)]
pub fn ajouter_tache(app: AppHandle, demande: NouvelleTache) -> Result<Tache, String> {
    base_donnees::ajouter_tache(&app, demande)
}

#[tauri::command(async)]
pub fn modifier_tache(app: AppHandle, demande: ModificationTache) -> Result<Tache, String> {
    base_donnees::modifier_tache(&app, demande)
}

#[tauri::command(async)]
pub fn changer_statut(app: AppHandle, id: i64, statut: String) -> Result<Tache, String> {
    base_donnees::changer_statut(&app, id, statut)
}

#[tauri::command(async)]
pub fn supprimer_tache(app: AppHandle, id: i64) -> Result<bool, String> {
    base_donnees::supprimer_tache(&app, id)
}
