use crate::models;

#[tauri::command]
pub fn get_game_saves(state: tauri::State<super::AppState>) -> Vec<models::GameSave> {
    state
        .inner
        .lock()
        .unwrap()
        .db_handle
        .get_saves()
        .unwrap()
        .into_iter()
        .map(|save| save.try_into().unwrap())
        .collect()
}
