import { useState } from 'react';
import { Category, CategoryExpansion } from '../types';

export const useCategoryExpansion = (categories: Category[]) => {
  const [expandedCategories, setExpandedCategories] =
    useState<CategoryExpansion>(
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: true }),
        {} as CategoryExpansion
      )
    );

  const toggleCategory = (category: string): void => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return {
    expandedCategories,
    toggleCategory,
  };
};
