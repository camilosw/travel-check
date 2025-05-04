import { ProgressBar } from './ProgressBar';
import { CategorySection } from './CategorySection';
import { ActionButtons } from './ActionButtons';
import {
  useCheckedItems,
  useCategoryExpansion,
  useCustomItems,
  useEditMode,
  useProgress,
  useLocalStorage,
} from '../hooks';
import { categories } from '../data';

const TravelChecklist = () => {
  // Initialize localStorage hook
  const { state, clearState } = useLocalStorage({
    markedItems: {},
    newItems: categories.reduce((acc, cat) => ({ ...acc, [cat.name]: [] }), {}),
    newItemText: categories.reduce(
      (acc, cat) => ({ ...acc, [cat.name]: '' }),
      {}
    ),
  });

  // Initialize hooks with localStorage state
  const checkedItems = useCheckedItems(state.markedItems);
  const categoryExpansion = useCategoryExpansion(categories);
  const customItems = useCustomItems(
    categories,
    state.newItems,
    state.newItemText
  );
  const editMode = useEditMode();
  const progress = useProgress(
    categories,
    checkedItems.markedItems,
    customItems.newItems
  );

  // Wrapper functions that save to localStorage
  const toggleItemWithSave = (
    category: string,
    itemIndex: number,
    isCustom = false
  ) => {
    checkedItems.toggleItem(category, itemIndex, isCustom);
    // Save to localStorage via the useEffect in useCheckedItems
  };

  const handleReset = () => {
    checkedItems.resetAll();
    customItems.resetItems();
    clearState();
  };

  const handleSaveEdit = () => {
    if (editMode.editMode.type === 'predefined') {
      console.warn('Editing predefined items is not fully implemented');
    } else {
      const currentItems = [
        ...customItems.newItems[editMode.editMode.category],
      ];
      currentItems[editMode.editMode.index] = editMode.editMode.text;
      // Update via customItems hook which will trigger save
      customItems.updateCustomItem(
        editMode.editMode.category,
        editMode.editMode.index,
        editMode.editMode.text
      );
    }
    editMode.cancelEdit();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Travel Checklist</h1>

      <ProgressBar progress={progress} />

      {/* Categories */}
      {categories.map((category, catIndex) => (
        <CategorySection
          key={catIndex}
          category={category}
          isExpanded={categoryExpansion.expandedCategories[category.name]}
          markedItems={checkedItems.markedItems}
          newItems={customItems.newItems[category.name] || []}
          newItemText={customItems.newItemText[category.name]}
          editMode={editMode.editMode}
          onToggleCategory={() =>
            categoryExpansion.toggleCategory(category.name)
          }
          onToggleItem={(itemIndex, isCustom) =>
            toggleItemWithSave(category.name, itemIndex, isCustom)
          }
          onToggleAll={(e) => {
            e.stopPropagation();
            checkedItems.toggleAllInCategory(category.name, category.items);
          }}
          onEdit={(index, text, type) => {
            editMode.startEdit(category.name, index, text, type);
          }}
          onDelete={(index, type) => {
            if (type === 'predefined') {
              console.warn(
                'Deleting predefined items is not fully implemented'
              );
            } else {
              customItems.deleteCustomItem(category.name, index);
            }
          }}
          onUpdateNewItemText={(text) => {
            customItems.updateNewItemText(category.name, text);
          }}
          onAddNewItem={() => {
            customItems.addNewItem(category.name);
          }}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={editMode.cancelEdit}
          onEditTextChange={(text) => {
            editMode.updateEditText(text);
          }}
        />
      ))}

      <ActionButtons onReset={handleReset} />
    </div>
  );
};

export default TravelChecklist;
