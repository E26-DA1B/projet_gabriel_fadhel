use crate::modeles::{ModificationTache, NouvelleTache, StatistiquesTaches, Tache};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

const NOM_FICHIER: &str = "taches.json";

fn chemin_fichier(app: &AppHandle) -> Result<PathBuf, String> {
    let dossier = app
        .path()
        .app_data_dir()
        .map_err(|erreur| format!("Impossible de trouver le dossier de données : {erreur}"))?;

    fs::create_dir_all(&dossier)
        .map_err(|erreur| format!("Impossible de créer le dossier de données : {erreur}"))?;

    Ok(dossier.join(NOM_FICHIER))
}

fn lire_json(app: &AppHandle) -> Result<Vec<Tache>, String> {
    let chemin = chemin_fichier(app)?;

    if !chemin.exists() {
        return Ok(Vec::new());
    }

    let contenu = fs::read_to_string(&chemin)
        .map_err(|erreur| format!("Impossible de lire le fichier de données : {erreur}"))?;

    if contenu.trim().is_empty() {
        return Ok(Vec::new());
    }

    serde_json::from_str(&contenu)
        .map_err(|erreur| format!("Le fichier contient un JSON invalide : {erreur}"))
}

fn ecrire_json(app: &AppHandle, taches: &[Tache]) -> Result<(), String> {
    let chemin = chemin_fichier(app)?;

    let contenu = serde_json::to_string_pretty(taches)
        .map_err(|erreur| format!("Impossible de convertir les tâches en JSON : {erreur}"))?;

    fs::write(&chemin, contenu)
        .map_err(|erreur| format!("Impossible d'écrire dans le fichier de données : {erreur}"))
}

pub fn lister_taches(app: &AppHandle) -> Result<Vec<Tache>, String> {
    lire_json(app)
}

pub fn obtenir_statistiques(app: &AppHandle) -> Result<StatistiquesTaches, String> {
    let taches = lire_json(app)?;
    Ok(StatistiquesTaches {
        total: taches.len(),
        a_faire: taches.iter().filter(|t| t.statut == "À faire").count(),
        en_cours: taches.iter().filter(|t| t.statut == "En cours").count(),
        termine: taches.iter().filter(|t| t.statut == "Terminé").count(),
    })
}

pub fn ajouter_tache(app: &AppHandle, demande: NouvelleTache) -> Result<Tache, String> {
    let mut taches = lire_json(app)?;

    let date_actuelle = chrono::Local::now().format("%Y-%m-%d %H:%M").to_string();

    let nouvelle = Tache {
        id: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map_err(|erreur| format!("Erreur lors de la génération de l'ID : {erreur}"))?
            .as_millis() as i64,
        titre: demande.titre,
        description: demande.description,
        statut: "À faire".to_string(),
        priorite: demande.priorite,
        date_creation: date_actuelle,
    };

    taches.push(nouvelle.clone());
    ecrire_json(app, &taches)?;
    Ok(nouvelle)
}

pub fn modifier_tache(app: &AppHandle, demande: ModificationTache) -> Result<Tache, String> {
    let mut taches = lire_json(app)?;

    let index = taches
        .iter()
        .position(|t| t.id == demande.id)
        .ok_or_else(|| format!("Tache introuvable pour l'ID {}", demande.id))?;

    taches[index].titre = demande.titre;
    taches[index].description = demande.description;
    taches[index].priorite = demande.priorite;

    let tache_modifiee = taches[index].clone();
    ecrire_json(app, &taches)?;
    Ok(tache_modifiee)
}

pub fn changer_statut(app: &AppHandle, id: i64, statut: String) -> Result<Tache, String> {
    let mut taches = lire_json(app)?;

    let index = taches
        .iter()
        .position(|t| t.id == id)
        .ok_or_else(|| format!("Tache introuvable pour l'ID {id}"))?;

    taches[index].statut = statut;

    let tache_modifiee = taches[index].clone();
    ecrire_json(app, &taches)?;
    Ok(tache_modifiee)
}

pub fn supprimer_tache(app: &AppHandle, id: i64) -> Result<bool, String> {
    let mut taches = lire_json(app)?;
    let taille_initiale = taches.len();
    taches.retain(|t| t.id != id);

    let supprime = taches.len() < taille_initiale;
    ecrire_json(app, &taches)?;
    Ok(supprime)
}