import React from "react";
import { GameSave } from "../backend/GameSave";

function game_name_from_game_id(id: number): string {
  if (id === 0) {
    return "Pokemon Ruby";
  } else if (id === 1) {
    return "Pokemon Sapphire";
  } else if (id === 2) {
    return "Pokemon Emerald";
  } else if (id === 3) {
    return "Pokemon FireRed";
  } else if (id === 4) {
    return "Pokemon LeafGreen";
  } else {
    return "Unknown Game";
  }
}

interface Props {
  save: GameSave;
}

const GameSaveEntry: React.FC<Props> = ({ save }) => {
  return (
    <div>
      <span className="game_save_entry">
        {save.trainer_name} {save.save_path} [
        {game_name_from_game_id(save.game_id)}]
      </span>
    </div>
  );
};

export default GameSaveEntry;
