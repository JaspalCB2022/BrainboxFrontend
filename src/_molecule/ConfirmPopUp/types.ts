export interface ConfirmPopUpProps {
    onYes: () => void;
    onClose: () => void;
    isDeletePopUp:boolean;
    alertMessage: string;
    deleteButtonText?: string;
    alertDescription?: string;
  }