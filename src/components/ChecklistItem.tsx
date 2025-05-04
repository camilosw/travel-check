import { EditItemForm } from './EditItemForm';

interface Props {
  item: string;
  isChecked: boolean;
  isEditing: boolean;
  editText: string;
  onCheck: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
}

export const ChecklistItem = ({
  item,
  isChecked,
  isEditing,
  editText,
  onCheck,
  onEdit,
  onDelete,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
}: Props) => {
  if (isEditing) {
    return (
      <li className="p-3 hover:bg-gray-50">
        <EditItemForm
          text={editText}
          onChange={onEditTextChange}
          onSave={onSaveEdit}
          onCancel={onCancelEdit}
        />
      </li>
    );
  }

  return (
    <li className="p-3 hover:bg-gray-50">
      <div className="flex items-center justify-between w-full">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="h-5 w-5 text-blue-600 rounded"
            checked={isChecked}
            onChange={onCheck}
          />
          <span className={isChecked ? 'line-through text-gray-500' : ''}>
            {item}
          </span>
        </label>
        <div className="flex">
          <button
            className="text-blue-500 hover:text-blue-700 mr-2"
            onClick={onEdit}
          >
            ✎
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={onDelete}
          >
            ✕
          </button>
        </div>
      </div>
    </li>
  );
};
