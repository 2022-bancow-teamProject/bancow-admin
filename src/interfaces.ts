import { Dispatch, SetStateAction } from "react";

export interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface MenuItemProps {
  title: string;
  onClick?: () => void;
  path?: string;
  children?: React.ReactChild;
}

export interface GridItemProps {
  das: number;
  children?: React.ReactChild;
}

export interface ChangeBtn {
  setIsDelete: Dispatch<SetStateAction<boolean>>;
}
