import React, { useState, useEffect } from "react";
import { GameSave } from "../backend/GameSave";
import { get_game_saves } from "../backend/api";
import GameSaveList from "./save_selection/GameSaveList";
import GameSaveSumamry from "./save_selection/GameSaveSummary";
import Popup from "./Popup";
import RoamSummary from "./save_selection/RoamSummary";

interface Props {}

const SaveSelectionScreen: React.FC<Props> = () => {
  const [gameSaves, setGameSaves] = useState<GameSave[]>([]);
  const [showSelectedSavePopup, setShowSelectedSavePopup] =
    useState<boolean>(false);
  const [selectedSave, setSelectedSave] = useState<GameSave | null>(null);
  const [roamSelected, setRoamSelected] = useState<boolean>(false);

  useEffect(() => {
    get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
    setInterval(() => {
      get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
    }, 30000);
  }, []);

  return (
    <div>
      <GameSaveList
        saves={gameSaves}
        setGameSaves={setGameSaves}
        setShowSelectedSavePopup={setShowSelectedSavePopup}
        setSelectedSave={setSelectedSave}
        setRoamSelected={setRoamSelected}
      />
      <Popup
        content={<GameSaveSumamry selectedSave={selectedSave} />}
        trigger={showSelectedSavePopup}
        setTrigger={setShowSelectedSavePopup}
      />
      <Popup
        content={<RoamSummary />}
        trigger={roamSelected}
        setTrigger={setRoamSelected}
      />
    </div>
  );
};

export default SaveSelectionScreen;
