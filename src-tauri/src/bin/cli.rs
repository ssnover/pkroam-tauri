/// Entrypoint for a CLI for testing the backend systems manually, or just convenient scripting perhaps.
use clap::{Parser, Subcommand};
use pkroam_tauri_lib::{app_paths::get_app_paths, database::DbConn, logging};
use prettytable::{format, row, Table};
use std::path::PathBuf;

#[derive(Parser)]
pub struct Cli {
    #[arg(long, short = 'c')]
    config_dir: Option<PathBuf>,
    #[arg(long, default_value = "true")]
    enable_debug: bool,
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Deposit {
        #[arg(long)]
        save: u32,
        #[arg(long)]
        box_number: u8,
        #[arg(long)]
        box_position: u8,
    },
    ListSaves,
    ListMons {
        #[arg(long)]
        save: Option<u32>,
    },
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();

    let app_paths = get_app_paths(args.config_dir)?;
    logging::initialize(args.enable_debug, &app_paths.get_log_path())?;
    let db_handle = DbConn::new(&app_paths.get_database_path())?;

    match args.command {
        Commands::Deposit {
            save,
            box_number,
            box_position,
        } => {
            let game_save = db_handle.get_save(save)?;
            let mut save_file = pkroam::save::SaveFile::new(game_save.data.save_path.as_path())?;
            if let Some(pokemon) = save_file.take_pokemon_from_box(box_number, box_position)? {
                match save_file.write_to_file(game_save.data.save_path.as_path()) {
                    Ok(()) => {
                        let pokemon_id = db_handle.insert_new_mon(
                            pokemon.original_trainer_id.public_id.into(),
                            pokemon.original_trainer_id.secret_id.into(),
                            pokemon.personality_value,
                            pokemon.to_pk3(),
                        )?;
                        log::info!("Added with ID: {pokemon_id}");
                    }
                    Err(err) => {
                        log::error!("Unable to update save file: {err}");
                    }
                }
            } else {
                log::warn!("Couldn't get a Pokemon from that box slot on this save file");
            }
        }
        Commands::ListSaves => {
            let saves = db_handle.get_saves()?;
            let mut table = Table::new();
            table.set_format(*format::consts::FORMAT_NO_BORDER_LINE_SEPARATOR);
            table.add_row(row![
                "ID",
                "GAME",
                "TRAINER NAME",
                "TRAINER ID",
                "PLAYTIME",
                "PATH"
            ]);

            for save in saves.iter().filter(|save| save.data.connected) {
                table.add_row(row![
                    save.id,
                    save.data.game,
                    save.data.trainer_name,
                    save.data.trainer_id,
                    format!(
                        "{:02}:{:02}",
                        save.data.playtime.hours, save.data.playtime.minutes
                    ),
                    save.data.save_path.display(),
                ]);
            }

            table.printstd();
        }
        Commands::ListMons { save } => {
            if let Some(save) = save {
                let game_save = db_handle.get_save(save)?;
                let save_file = pkroam::save::SaveFile::new(game_save.data.save_path.as_path())?;
                let mut table = Table::new();
                table.set_format(*format::consts::FORMAT_NO_BORDER_LINE_SEPARATOR);
                table.add_row(row!["BOX", "SLOT", "POKEMON"]);

                for (idx, pkmn) in save_file.get_party()?.iter().enumerate() {
                    table.add_row(row!["P", idx + 1, pkmn.species]);
                }

                for box_number in 1..14 {
                    let box_pkmn = save_file.get_box(box_number).map_err(|err| {
                        log::error!("Failed to get Pokemon from box {box_number}: {err}");
                        err
                    })?;
                    for (position, pkmn) in box_pkmn {
                        table.add_row(row![box_number, position, pkmn.species]);
                    }
                }

                table.printstd();
            }
        }
    }

    Ok(())
}
