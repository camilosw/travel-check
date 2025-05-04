import { useState } from 'react';
import { EditModeState } from '../types';

export const useEditMode = () => {
  const [editMode, setEditMode] = useState<EditModeState>({
    active: false,
    category: '',
    index: -1,
    type: '',
    text: '',
  });

  const startEdit = (
    category: string,
    index: number,
    text: string,
    type: 'predefined' | 'custom'
  ): void => {
    setEditMode({
      active: true,
      category,
      index,
      type,
      text,
    });
  };

  const cancelEdit = (): void => {
    setEditMode({
      active: false,
      category: '',
      index: -1,
      type: '',
      text: '',
    });
  };

  const updateEditText = (text: string): void => {
    setEditMode({
      ...editMode,
      text,
    });
  };

  return {
    editMode,
    startEdit,
    cancelEdit,
    updateEditText,
  };
};
