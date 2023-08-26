import { invoke } from "@tauri-apps/api/tauri";
import { GameSave } from "./GameSave";

export function getGameSaves() {
  return invoke("get_game_saves").then((res: unknown) => {
    return res as Array<GameSave>;
  });
}

export function addNewSave(path: string, game_id: number) {
  return invoke("add_new_save", { path: path, gameId: game_id });
}

export function disconnectSave(save_id: number) {
  return invoke("disconnect_save", { saveId: save_id });
}

export function logDebug(logline: string) {
  invoke("log_debug", { logline: logline });
}
