import { Category } from '../types';

interface Props {
  category: Category;
  isExpanded: boolean;
  checkedCount: number;
  onToggle: () => void;
  onToggleAll: (e: React.MouseEvent) => void;
  allChecked: boolean;
}

export const CategoryHeader = ({
  category,
  isExpanded,
  checkedCount,
  onToggle,
  onToggleAll,
  allChecked,
}: Props) => {
  return (
    <div
      className="flex justify-between items-center p-3 bg-gray-100 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">{category.name}</h2>
        <button
          className="ml-4 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          onClick={onToggleAll}
        >
          {allChecked ? 'Uncheck all' : 'Check all'}
        </button>
      </div>
      <span className="text-gray-500">
        {checkedCount} / {category.items.length}
        {isExpanded ? ' ▼' : ' ►'}
      </span>
    </div>
  );
};
