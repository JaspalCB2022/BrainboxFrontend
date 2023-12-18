import React, { useState } from "react";
import './index.css';

interface ConfirmPopUpProps {
  onYes: () => void;
  onClose: () => void;
  isDeletePopUp:boolean;
  alertMessage: string;
  deleteButtonText?: string;
  alertDescription?: string;
}

const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
  onYes,
  onClose,
  alertMessage,
  deleteButtonText,
  alertDescription,
}) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="confirmationBackdrop" id="confirmationBackdrop">
      <div className="deleteConfirmation" id="deleteConfirmation">
        <p>
          {alertMessage}
          {alertDescription && (
            <div style={{ fontSize: "14px", color: "#333", marginTop: '3px' }}>
              {alertDescription}
            </div>
          )}
        </p>

        <button
          id="confirmDelete"
          className={`btn-outline`}
          onClick={onYes}
        >
          {deleteButtonText ? deleteButtonText : "Delete"}
        </button>
        <button className="btn-outline" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
