import React from "react";

interface Props {
  setNewSaveSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewSaveEntry: React.FC<Props> = ({ setNewSaveSelected }) => {
  return (
    <div>
      <span
        className="game_save_entry"
        onClick={() => setNewSaveSelected(true)}
      >
        NEW SAVE
      </span>
    </div>
  );
};

export default NewSaveEntry;
