interface SubNav {
  name: string;
  url: string;
}

export interface NavContent {
  name: string;
  icon: string;
  activeIcon: string;
  open?: boolean;
  subNav?: SubNav[];
  url?: string;
}

export interface NavBarProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}
