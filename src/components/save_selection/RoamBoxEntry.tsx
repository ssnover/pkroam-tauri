import React from "react";

interface Props {
  setRoamSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoamBoxEntry: React.FC<Props> = ({ setRoamSelected }) => {
  return (
    <div>
      <span className="game_save_entry" onClick={() => setRoamSelected(true)}>
        ROAM BOXES
      </span>
    </div>
  );
};

export default RoamBoxEntry;
