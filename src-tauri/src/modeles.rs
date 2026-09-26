use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct Tache {
    pub id: i64,
    pub titre: String,
    pub description: String,
    pub statut: String,
    pub priorite: String,
    pub date_creation: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NouvelleTache {
    pub titre: String,
    pub description: String,
    pub priorite: String,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ModificationTache {
    pub id: i64,
    pub titre: String,
    pub description: String,
    pub priorite: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct StatistiquesTaches {
    pub total: usize,
    pub a_faire: usize,
    pub en_cours: usize,
    pub termine: usize,
}
