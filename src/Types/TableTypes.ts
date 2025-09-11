export interface TUser  {
  name?: string;
  age: number | null;
  id: string;
  isValueChange?: boolean;
};

export type TTableDataPopUpProps = {
  user: TUser;
  setIsOpen: (a: boolean) => void;
  handleUpdateTable: (id: string, form: Omit<TUser, "id">) => void;
  handleDeleteRow: (id: string) => void;
};

export type TCalAges = {
  teens: number;
  adults: number;
  olds: number;
  calculateAges?: () => {
    teens: number;
    adults: number;
    olds: number;
  };
};

export type TAddRowProps = {
  handleAddRow: (data: { name: string; age: number | null }) => void;
  isAddRowOpen: boolean;
  setIsAddRowOpen: (a: boolean) => void;
};

export type TAddRowForm = {
  name: string;
  age: number | null;
};

export type TTableRowProps ={
    user: TUser,
    handleTablePopup?:(id : string)=> void,
    index : number
}