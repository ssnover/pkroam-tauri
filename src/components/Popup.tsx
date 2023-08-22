import React from "react";
import "./styles.css";

interface Props {
  content: React.ReactNode;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup: React.FC<Props> = ({ content, trigger, setTrigger }) => {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="popup-close-btn" onClick={() => setTrigger(false)}>
          Close
        </button>
        {content}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Popup;
