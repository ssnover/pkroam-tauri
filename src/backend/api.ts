import { invoke } from "@tauri-apps/api/tauri";
import { GameSave } from "./GameSave";

export function get_game_saves() {
  return invoke("get_game_saves").then((res: unknown) => {
    return res as Array<GameSave>;
  });
}

export function add_new_save(path: string, game_id: number) {
  return invoke("add_new_save", { path: path, gameId: game_id });
}

export function logDebug(logline: string) {
  invoke("log_debug", { logline: logline });
}
