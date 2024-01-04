export interface TopBarProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    name: string;
    setOpenDrawer:React.Dispatch<React.SetStateAction<boolean>>;
    openDrawer:boolean;
  }