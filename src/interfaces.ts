import { Dispatch, SetStateAction } from "react";

export interface MenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface GTSelectorProps {
  isDelete: boolean;
  setIsDelete: Dispatch<SetStateAction<boolean>>;
  setChecked: Dispatch<SetStateAction<number[]>>;
  delfunc?: (e?: any) => Promise<void> | void;
}

export interface GTHeaderProps {
  children?: React.ReactChild | React.ReactChild[];
}

export interface MenuItemProps {
  title: string;
  onClick?: () => void;
  path?: string;
  children?: React.ReactChild;
}

export interface GridItemProps {
  das: number;
  id?: number;
  onClick?: () => void;
  children?: React.ReactChild;
}

export interface ChangeBtn {
  editform?: boolean;
  btnstate?: boolean;
  func?: Dispatch<any>;
}

export interface AddContentBtn {
  editform?: boolean;
  btnstate?: boolean;
  add?: (e?: any) => Promise<void>;
}

export interface DatePickerProps {
  datePick: [string | null, string | null];
  setDatePick: Dispatch<SetStateAction<[string | null, string | null]>>;
}
