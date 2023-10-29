// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use clap::Parser;
use pkroam_tauri_lib::{app_state::*, *};
use std::path::PathBuf;

#[derive(Parser)]
pub struct Cli {
    #[arg(long)]
    config_dir: Option<PathBuf>,
    #[arg(long)]
    enable_debug: bool,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();

    let app_paths = match app_paths::get_app_paths(args.config_dir) {
        Ok(app_paths) => app_paths,
        Err(err) => {
            eprintln!("{err}");
            std::process::exit(1);
        }
    };

    logging::initialize(true, &app_paths.get_log_path())?;
    if args.enable_debug {
        println!("Logging to path: {}", &app_paths.get_log_path().display());
    }
    let db_handle = database::DbConn::new(&app_paths.get_database_path())?;

    let app_state = AppState::new(db_handle);

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            commands::get_game_saves,
            commands::add_new_save,
            commands::disconnect_save,
            commands::log_debug,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
