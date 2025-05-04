interface Props {
  text: string;
  onChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditItemForm = ({ text, onChange, onSave, onCancel }: Props) => {
  return (
    <div className="flex items-center w-full">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded mr-2"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
      <button
        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-1"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  );
};
