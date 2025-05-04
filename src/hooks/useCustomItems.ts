import { useState, useEffect } from 'react';
import { Category, CustomItems, NewItemText } from '../types';

export const useCustomItems = (
  categories: Category[],
  initialNewItems?: CustomItems,
  initialNewItemText?: NewItemText
) => {
  const [newItems, setNewItems] = useState<CustomItems>(
    initialNewItems ||
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: [] }),
        {} as CustomItems
      )
  );

  const [newItemText, setNewItemText] = useState<NewItemText>(
    initialNewItemText ||
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: '' }),
        {} as NewItemText
      )
  );

  // Save to localStorage whenever newItems or newItemText change
  useEffect(() => {
    const state = JSON.parse(
      localStorage.getItem('travel-checklist-state') || '{}'
    );
    state.newItems = newItems;
    state.newItemText = newItemText;
    localStorage.setItem('travel-checklist-state', JSON.stringify(state));
  }, [newItems, newItemText]);

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

  const updateCustomItem = (
    category: string,
    index: number,
    newText: string
  ): void => {
    const newArray = [...newItems[category]];
    newArray[index] = newText;
    setNewItems({
      ...newItems,
      [category]: newArray,
    });
  };

  const resetItems = (): void => {
    setNewItems(
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: [] }),
        {} as CustomItems
      )
    );
    setNewItemText(
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: '' }),
        {} as NewItemText
      )
    );
  };

  return {
    newItems,
    newItemText,
    updateNewItemText,
    addNewItem,
    deleteCustomItem,
    updateCustomItem,
    resetItems,
  };
};
