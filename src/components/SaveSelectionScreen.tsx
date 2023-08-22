import React, { useState, useEffect } from "react";
import { GameSave } from "../backend/GameSave";
import { add_new_save, get_game_saves } from "../backend/api";
import GameSaveList from "./save_selection/GameSaveList";
import GameSaveSumamry from "./save_selection/GameSaveSummary";
import Popup from "./Popup";
import NewSaveForm from "./save_selection/NewSaveForm";
import RoamSummary from "./save_selection/RoamSummary";

interface Props {}

const SaveSelectionScreen: React.FC<Props> = () => {
  const [gameSaves, setGameSaves] = useState<GameSave[]>([]);
  const [showSelectedSavePopup, setShowSelectedSavePopup] =
    useState<boolean>(false);
  const [selectedSave, setSelectedSave] = useState<GameSave | null>(null);
  const [roamSelected, setRoamSelected] = useState<boolean>(false);
  const [newSaveSelected, setNewSaveSelected] = useState<boolean>(false);

  useEffect(() => {
    get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
  }, []);

  useEffect(() => {
    setInterval(() => {
      get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
    }, 30000);
  }, []);

  const handleAdd = (e: React.FormEvent, savePath: string, gameId: number) => {
    e.preventDefault();
    add_new_save(savePath, gameId);
    setNewSaveSelected(false);
    get_game_saves().then((saves: GameSave[]) => setGameSaves(saves));
  };

  return (
    <div>
      <GameSaveList
        saves={gameSaves}
        setGameSaves={setGameSaves}
        setShowSelectedSavePopup={setShowSelectedSavePopup}
        setSelectedSave={setSelectedSave}
        setRoamSelected={setRoamSelected}
        setNewSaveSelected={setNewSaveSelected}
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
      <Popup
        content={<NewSaveForm handleAdd={handleAdd} />}
        trigger={newSaveSelected}
        setTrigger={setNewSaveSelected}
      />
    </div>
  );
};

export default SaveSelectionScreen;
