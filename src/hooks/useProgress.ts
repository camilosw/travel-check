import { useMemo } from 'react';
import { Category, MarkedItems, CustomItems, Progress } from '../types';

export const useProgress = (
  categories: Category[],
  markedItems: MarkedItems,
  newItems: CustomItems
) => {
  return useMemo((): Progress => {
    let totalItems = 0;
    let completedItems = 0;

    categories.forEach((cat) => {
      totalItems += cat.items.length;
      cat.items.forEach((_, idx) => {
        if (markedItems[`${cat.name}-${idx}`]) {
          completedItems++;
        }
      });

      if (newItems[cat.name]) {
        totalItems += newItems[cat.name].length;
        newItems[cat.name].forEach((_, idx) => {
          if (markedItems[`${cat.name}-custom-${idx}`]) {
            completedItems++;
          }
        });
      }
    });

    return {
      percentage: totalItems
        ? Math.round((completedItems / totalItems) * 100)
        : 0,
      completed: completedItems,
      total: totalItems,
    };
  }, [categories, markedItems, newItems]);
};
