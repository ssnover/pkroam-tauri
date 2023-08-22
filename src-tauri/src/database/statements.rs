pub const CREATE_TABLE_SAVES: &str = "CREATE TABLE saves (
    id INTEGER PRIMARY KEY,
    game INTEGER,
    trainer_name TEXT NOT NULL,
    trainer_id INTEGER,
    secret_id INTEGER,
    playtime_hours INTEGER,
    playtime_minutes INTEGER,
    playtime_frames INTEGER,
    save_path TEXT NOT NULL
)";

pub const SELECT_SAVES: &str =
    "SELECT id, game, trainer_name, trainer_id, secret_id, playtime_hours, playtime_minutes, playtime_frames, save_path FROM saves";

pub const INSERT_SAVE_INTO_SAVES: &str = "INSERT INTO saves (
    game, trainer_name, trainer_id, secret_id, 
    playtime_hours, playtime_minutes, playtime_frames, save_path) 
    VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)";

pub const DELETE_SAVE_FROM_SAVES: &str = "DELETE FROM saves
    WHERE id = (?1)";
