mod base_donnees;
mod commandes;
mod modeles;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commandes::lister_taches,
            commandes::obtenir_statistiques,
            commandes::ajouter_tache,
            commandes::modifier_tache,
            commandes::changer_statut,
            commandes::supprimer_tache,
        ])
        .run(tauri::generate_context!())
        .expect("erreur pendant l'exécution de l'application Tauri");
}