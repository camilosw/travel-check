import { useState } from 'react';
import { Category, CustomItems } from '../types';

export const useCustomItems = (categories: Category[]) => {
  const [newItems, setNewItems] = useState<CustomItems>(
    categories.reduce(
      (acc, cat) => ({ ...acc, [cat.name]: [] }),
      {} as CustomItems
    )
  );

  const [newItemText, setNewItemText] = useState<CustomItems>(
    categories.reduce(
      (acc, cat) => ({ ...acc, [cat.name]: '' }),
      {} as CustomItems
    )
  );

  const updateNewItemText = (category: string, text: string): void => {
    setNewItemText({
      ...newItemText,
      [category]: text,
    });
  };

  const addNewItem = (category: string): void => {
    const text = newItemText[category].trim();
    if (text) {
      setNewItems({
        ...newItems,
        [category]: [...newItems[category], text],
      });
      setNewItemText({
        ...newItemText,
        [category]: '',
      });
    }
  };

  const deleteCustomItem = (category: string, index: number): void => {
    const newArray = [...newItems[category]];
    newArray.splice(index, 1);
    setNewItems({
      ...newItems,
      [category]: newArray,
    });
  };

  return {
    newItems,
    newItemText,
    updateNewItemText,
    addNewItem,
    deleteCustomItem,
  };
};
