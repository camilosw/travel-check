export interface Category {
  name: string;
  items: string[];
}

export interface Progress {
  percentage: number;
  completed: number;
  total: number;
}

export interface EditModeState {
  active: boolean;
  category: string;
  index: number;
  type: 'predefined' | 'custom' | '';
  text: string;
}

export interface MarkedItems {
  [key: string]: boolean;
}

export interface CategoryExpansion {
  [key: string]: boolean;
}

export interface CustomItems {
  [key: string]: string[];
}
export interface NewItemText {
  [key: string]: string;
}
