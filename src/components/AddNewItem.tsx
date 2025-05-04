interface Props {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
  placeholder?: string;
}

export const AddNewItem = ({
  value,
  onChange,
  onAdd,
  placeholder = 'Add new reminder...',
}: Props) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onAdd();
    }
  };

  return (
    <li className="p-3 bg-gray-50">
      <div className="flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          className="flex-grow p-2 border border-gray-300 rounded mr-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => {
            if (value.trim()) {
              onAdd();
            }
          }}
        >
          Add
        </button>
      </div>
    </li>
  );
};
