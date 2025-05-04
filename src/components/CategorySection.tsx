import { AddNewItem } from './AddNewItem';
import { CategoryHeader } from './CategoryHeader';
import { ChecklistItem } from './ChecklistItem';
import { Category, EditModeState, MarkedItems } from '../types';

interface Props {
  category: Category;
  isExpanded: boolean;
  markedItems: MarkedItems;
  newItems: string[];
  newItemText: string;
  editMode: EditModeState;
  onToggleCategory: () => void;
  onToggleItem: (itemIndex: number, isCustom?: boolean) => void;
  onToggleAll: (e: React.MouseEvent) => void;
  onEdit: (index: number, text: string, type: 'predefined' | 'custom') => void;
  onDelete: (index: number, type: 'predefined' | 'custom') => void;
  onUpdateNewItemText: (text: string) => void;
  onAddNewItem: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
}

export const CategorySection = ({
  category,
  isExpanded,
  markedItems,
  newItems,
  newItemText,
  editMode,
  onToggleCategory,
  onToggleItem,
  onToggleAll,
  onEdit,
  onDelete,
  onUpdateNewItemText,
  onAddNewItem,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
}: Props) => {
  const getCheckedCount = (): number => {
    return category.items.filter(
      (_, idx) => markedItems[`${category.name}-${idx}`]
    ).length;
  };

  const areAllChecked = (): boolean => {
    return category.items.every(
      (_, idx) => markedItems[`${category.name}-${idx}`]
    );
  };

  return (
    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
      <CategoryHeader
        category={category}
        isExpanded={isExpanded}
        checkedCount={getCheckedCount()}
        onToggle={onToggleCategory}
        onToggleAll={onToggleAll}
        allChecked={areAllChecked()}
      />

      {isExpanded && (
        <ul className="divide-y divide-gray-200">
          {/* Predefined items */}
          {category.items.map((item, itemIndex) => (
            <ChecklistItem
              key={itemIndex}
              item={item}
              isChecked={!!markedItems[`${category.name}-${itemIndex}`]}
              isEditing={
                editMode.active &&
                editMode.category === category.name &&
                editMode.index === itemIndex &&
                editMode.type === 'predefined'
              }
              editText={editMode.text}
              onCheck={() => onToggleItem(itemIndex)}
              onEdit={() => onEdit(itemIndex, item, 'predefined')}
              onDelete={() => onDelete(itemIndex, 'predefined')}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onEditTextChange={onEditTextChange}
            />
          ))}

          {/* Custom items */}
          {newItems &&
            newItems.map((item, itemIndex) => (
              <ChecklistItem
                key={`custom-${itemIndex}`}
                item={item}
                isChecked={
                  !!markedItems[`${category.name}-custom-${itemIndex}`]
                }
                isEditing={
                  editMode.active &&
                  editMode.category === category.name &&
                  editMode.index === itemIndex &&
                  editMode.type === 'custom'
                }
                editText={editMode.text}
                onCheck={() => onToggleItem(itemIndex, true)}
                onEdit={() => onEdit(itemIndex, item, 'custom')}
                onDelete={() => onDelete(itemIndex, 'custom')}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onEditTextChange={onEditTextChange}
              />
            ))}

          {/* Add new item form */}
          <AddNewItem
            value={newItemText}
            onChange={onUpdateNewItemText}
            onAdd={onAddNewItem}
          />
        </ul>
      )}
    </div>
  );
};
