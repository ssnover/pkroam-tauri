import React from "react";
import { GameSave } from "../../backend/GameSave";
import { disconnectSave } from "../../backend/api";
import {
  game_name_from_game_id,
  toZeroPaddedString,
} from "../../backend/utils";

interface Props {
  selectedSave: GameSave | null;
  setShowSelectedSavePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameSaveSumamry: React.FC<Props> = ({
  selectedSave,
  setShowSelectedSavePopup,
}) => {
  return selectedSave !== null ? (
    <div className="game-save-summary">
      <table>
        <tr>
          <td>Game</td>
          <td>{game_name_from_game_id(selectedSave.game_id)}</td>
        </tr>
        <tr>
          <td>Trainer Name</td>
          <td>{selectedSave.trainer_name}</td>
        </tr>
        <tr>
          <td>Play Time</td>
          <td>
            {toZeroPaddedString(selectedSave.playtime_hours, 2)}:
            {toZeroPaddedString(selectedSave.playtime_minutes, 2)}
          </td>
        </tr>
        <tr>
          <td>Trainer ID</td>
          <td>{selectedSave.trainer_id}</td>
        </tr>
        <tr>
          <td>Save Path</td>
          <td>{selectedSave.save_path}</td>
        </tr>
      </table>
      <button>Select</button>
      <button
        onClick={() => {
          setShowSelectedSavePopup(false);
          disconnectSave(selectedSave.id);
        }}
      >
        Delete
      </button>
    </div>
  ) : (
    <div>
      <p>Invalid save selected</p>
    </div>
  );
};

export default GameSaveSumamry;
