use crate::types;
use num_traits::ToPrimitive;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Deserialize, Serialize, TS)]
#[ts(export, export_to = "../src/backend/")]
pub struct GameSave {
    pub id: i32,
    pub game_id: u32,
    pub trainer_name: String,
    pub trainer_id: u32,
    pub secret_id: u32,
    pub playtime_hours: u32,
    pub playtime_minutes: u32,
    pub playtime_frames: u32,
    pub connected: bool,
    pub save_path: String,
}

impl From<types::GameSave> for GameSave {
    fn from(value: types::GameSave) -> Self {
        Self {
            id: value.id.try_into().unwrap(),
            game_id: value.data.game.to_u32().unwrap(),
            trainer_name: value.data.trainer_name,
            trainer_id: value.data.trainer_id,
            secret_id: value.data.secret_id,
            playtime_hours: value.data.playtime.hours,
            playtime_minutes: value.data.playtime.minutes,
            playtime_frames: value.data.playtime.frames,
            connected: value.data.connected,
            save_path: value.data.save_path.to_string_lossy().to_string(),
        }
    }
}
