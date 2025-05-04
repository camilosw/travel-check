import { useState } from 'react';
import {
  Category,
  CategoryExpansion,
  CustomItems,
  EditModeState,
  MarkedItems,
  Progress,
} from '../types';
import { ProgressBar } from './ProgressBar';
import { CategorySection } from './CategorySection';
import { ActionButtons } from './ActionButtons';

const TravelChecklist: React.FC = () => {
  // Categories and list items
  const categories: Category[] = [
    {
      name: 'Important documents',
      items: [
        'ID/passport',
        "Driver's license (if planning to drive)",
        'Credit/debit cards',
        'Cash',
        'Reservation confirmations (hotel, flights, activities)',
        'Travel insurance (if applicable)',
      ],
    },
    {
      name: 'Electronics',
      items: [
        'Mobile phone and charger',
        'Computer/tablet and charger (if necessary)',
        'Plug adapters/converters',
        'Power bank',
        'Headphones',
        'Camera and charger (if different from phone)',
      ],
    },
    {
      name: 'Clothing',
      items: [
        'Underwear (one per day + extras)',
        'Socks (one per day + extras)',
        'T-shirts/blouses',
        'Pants/skirts/shorts',
        'Sleepwear',
        'Light sweater/jacket',
        'Raincoat (depending on weather)',
        'Swimsuit (if applicable)',
        'Comfortable walking shoes',
        'Alternative shoes/sandals',
      ],
    },
    {
      name: 'Personal hygiene items',
      items: [
        'Toothbrush and toothpaste',
        'Deodorant',
        'Shampoo and conditioner',
        'Soap/body wash',
        'Moisturizer',
        'Sunscreen',
        'Insect repellent',
        'Feminine hygiene products (if applicable)',
        'Regular medications',
        'Basic first aid kit (pain relievers, bandages, etc.)',
      ],
    },
    {
      name: 'Things to do before leaving',
      items: [
        'Unplug non-essential appliances',
        'Adjust thermostat/heating',
        'Close all windows and doors',
        'Empty trash',
        'Clean fridge of perishable food',
        'Water plants or arrange for someone to do it',
        'Notify trusted neighbor or family member',
        'Set up lights with timer (if possible)',
        'Check that water taps are closed',
        'Verify gas is turned off (if applicable)',
        'Activate alarm system (if applicable)',
        'Leave spare keys with trusted person',
        'Check weather forecast for destination',
      ],
    },
  ];

  // State
  const [markedItems, setMarkedItems] = useState<MarkedItems>({});
  const [expandedCategories, setExpandedCategories] =
    useState<CategoryExpansion>(
      categories.reduce(
        (acc, cat) => ({ ...acc, [cat.name]: true }),
        {} as CategoryExpansion
      )
    );
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
  const [editMode, setEditMode] = useState<EditModeState>({
    active: false,
    category: '',
    index: -1,
    type: '',
    text: '',
  });

  // Functions
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

  const toggleCategory = (category: string): void => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
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

  const calculateProgress = (): Progress => {
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
  };

  const handleSave = (): void => {
    alert(
      'State saved! This functionality could be expanded to save state in localStorage or export to PDF.'
    );
  };

  const progress = calculateProgress();

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Travel Checklist</h1>

      <ProgressBar progress={progress} />

      {/* Categories */}
      {categories.map((category, catIndex) => (
        <CategorySection
          key={catIndex}
          category={category}
          isExpanded={expandedCategories[category.name]}
          markedItems={markedItems}
          newItems={newItems[category.name] || []}
          newItemText={newItemText[category.name]}
          editMode={editMode}
          onToggleCategory={() => toggleCategory(category.name)}
          onToggleItem={(itemIndex, isCustom) =>
            toggleItem(category.name, itemIndex, isCustom)
          }
          onToggleAll={(e) => {
            e.stopPropagation();
            toggleAllInCategory(category.name, category.items);
          }}
          onEdit={(index, text, type) => {
            setEditMode({
              active: true,
              category: category.name,
              index,
              type,
              text,
            });
          }}
          onDelete={(index, type) => {
            if (type === 'predefined') {
              if (
                window.confirm('Are you sure you want to delete this item?')
              ) {
                const newCategories = [...categories];
                newCategories[
                  categories.findIndex((c) => c.name === category.name)
                ].items.splice(index, 1);
              }
            } else {
              const newArray = [...newItems[category.name]];
              newArray.splice(index, 1);
              setNewItems({
                ...newItems,
                [category.name]: newArray,
              });
            }
          }}
          onUpdateNewItemText={(text) => {
            setNewItemText({
              ...newItemText,
              [category.name]: text,
            });
          }}
          onAddNewItem={() => {
            const text = newItemText[category.name].trim();
            if (text) {
              setNewItems({
                ...newItems,
                [category.name]: [...newItems[category.name], text],
              });
              setNewItemText({
                ...newItemText,
                [category.name]: '',
              });
            }
          }}
          onSaveEdit={() => {
            if (editMode.type === 'predefined') {
              const newCategories = [...categories];
              newCategories[
                categories.findIndex((c) => c.name === editMode.category)
              ].items[editMode.index] = editMode.text;
            } else {
              const newArray = [...newItems[editMode.category]];
              newArray[editMode.index] = editMode.text;
              setNewItems({
                ...newItems,
                [editMode.category]: newArray,
              });
            }

            setEditMode({
              active: false,
              category: '',
              index: -1,
              type: '',
              text: '',
            });
          }}
          onCancelEdit={() => {
            setEditMode({
              active: false,
              category: '',
              index: -1,
              type: '',
              text: '',
            });
          }}
          onEditTextChange={(text) => {
            setEditMode({
              ...editMode,
              text,
            });
          }}
        />
      ))}

      <ActionButtons onSave={handleSave} onReset={resetAll} />
    </div>
  );
};

export default TravelChecklist;
