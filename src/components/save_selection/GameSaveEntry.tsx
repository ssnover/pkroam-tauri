import React from "react";
import { GameSave } from "../../backend/GameSave";
import { game_name_from_game_id } from "../../backend/utils";

interface Props {
  save: GameSave;
  setShowSelectedSavePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSave: React.Dispatch<React.SetStateAction<GameSave | null>>;
}

const GameSaveEntry: React.FC<Props> = ({
  save,
  setShowSelectedSavePopup,
  setSelectedSave,
}) => {
  return (
    <div>
      <span
        className="game_save_entry"
        onClick={() => {
          setShowSelectedSavePopup(true);
          setSelectedSave(save);
        }}
      >
        {save.trainer_name} {save.save_path} [
        {game_name_from_game_id(save.game_id)}]
      </span>
    </div>
  );
};

export default GameSaveEntry;
