import { invoke } from "@tauri-apps/api/tauri";
import { GameSave } from "./GameSave";

export function get_game_saves() {
  return invoke("get_game_saves").then((res: unknown) => {
    return res as Array<GameSave>;
  });
}
