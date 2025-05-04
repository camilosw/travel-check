import { useState, useEffect } from 'react';
import { MarkedItems } from '../types';

export const useCheckedItems = (initialMarkedItems?: MarkedItems) => {
  const [markedItems, setMarkedItems] = useState<MarkedItems>(
    initialMarkedItems || {}
  );

  // Save to localStorage whenever markedItems change
  useEffect(() => {
    if (Object.keys(markedItems).length > 0) {
      const state = JSON.parse(
        localStorage.getItem('travel-checklist-state') || '{}'
      );
      state.markedItems = markedItems;
      localStorage.setItem('travel-checklist-state', JSON.stringify(state));
    }
  }, [markedItems]);

  const toggleItem = (
    category: string,
    itemIndex: number,
    isCustom = false
  ): void => {
    const key = isCustom
      ? `${category}-custom-${itemIndex}`
      : `${category}-${itemIndex}`;
    setMarkedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAllInCategory = (category: string, items: string[]): void => {
    const newMarkedItems = { ...markedItems };
    const allItemsKeys = items.map((_, idx) => `${category}-${idx}`);
    const allMarked = allItemsKeys.every((key) => markedItems[key]);

    allItemsKeys.forEach((key) => {
      newMarkedItems[key] = !allMarked;
    });

    setMarkedItems(newMarkedItems);
  };

  const resetAll = (): void => {
    setMarkedItems({});
  };

  return {
    markedItems,
    toggleItem,
    toggleAllInCategory,
    resetAll,
  };
};
