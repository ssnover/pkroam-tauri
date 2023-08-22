use crate::models;
use crate::types::GameSaveData;

#[tauri::command]
pub fn get_game_saves(state: tauri::State<super::AppState>) -> Vec<models::GameSave> {
    log::debug!("UI command called: get_game_saves");
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

#[tauri::command]
pub fn add_new_save(path: String, game_id: u32, state: tauri::State<super::AppState>) {
    log::debug!("UI command called: add_new_save. path={path}, game_id={game_id}");
    match GameSaveData::from_path(&path, game_id) {
        Ok(save) => state
            .inner
            .lock()
            .unwrap()
            .db_handle
            .add_new_save(&save)
            .unwrap(),
        Err(err) => log::error!("Failed to get game save data from path {err}"),
    }
}

#[tauri::command]
pub fn log_debug(logline: String) {
    log::debug!("Frontend: {logline}");
}
