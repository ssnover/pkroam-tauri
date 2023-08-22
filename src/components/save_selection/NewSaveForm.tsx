import React, { useState } from "react";
import { game_name_from_game_id, game_id_variants } from "../../backend/utils";
import { logDebug } from "../../backend/api";

interface Props {
  handleAdd: (e: React.FormEvent, savePath: string, gameId: number) => void;
}

const NewSaveForm: React.FC<Props> = ({ handleAdd }) => {
  const options: Array<[number, string]> = game_id_variants().map((x) => [
    x,
    game_name_from_game_id(x),
  ]);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [savePath, setSavePath] = useState<string>("");

  return (
    <div className="new-save-form">
      <input
        type="input"
        value={savePath}
        onChange={(e) => setSavePath(e.target.value)}
        placeholder="Enter a path to a save file"
        className="input__save_file_path"
      />
      <div className="dropdown">
        <select
          name="option"
          className="dropdown__select"
          onChange={(e) => {
            e.preventDefault();
            var option = e.currentTarget.value;
            logDebug(`Setting dropdown option to ${option}`);
            setSelectedOption(Number(option));
          }}
        >
          {options.map((option: [number, string]) => {
            return <option value={option[0]}>{option[1]}</option>;
          })}
        </select>
      </div>
      {/* <DropDown options={options} setSelectedOption={setSelectedOption} /> */}
      <button
        className="input__save_file_path_submit"
        onClick={(e) => {
          e.preventDefault();
          handleAdd(e, savePath, selectedOption);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default NewSaveForm;
