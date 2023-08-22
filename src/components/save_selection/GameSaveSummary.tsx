import React from "react";
import { GameSave } from "../../backend/GameSave";
import { game_name_from_game_id } from "../../backend/utils";

interface Props {
  selectedSave: GameSave | null;
}

const GameSaveSumamry: React.FC<Props> = ({ selectedSave }) => {
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
            {selectedSave.playtime_hours}:{selectedSave.playtime_minutes}
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
    </div>
  ) : (
    <div>
      <p>Invalid save selected</p>
    </div>
  );
};

export default GameSaveSumamry;
