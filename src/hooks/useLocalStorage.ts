import { useState, useEffect } from 'react';
import { MarkedItems, CustomItems, NewItemText } from '../types';

const STORAGE_KEY = 'travel-checklist-state';

interface AppState {
  markedItems: MarkedItems;
  newItems: CustomItems;
  newItemText: NewItemText;
}

export const useLocalStorage = (initialValue: AppState) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state]);

  const updateState = (newState: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const clearState = () => {
    setState(initialValue);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    state,
    updateState,
    clearState,
  };
};
