interface Props {
  onSave: () => void;
  onReset: () => void;
}

export const ActionButtons = ({ onSave, onReset }: Props) => {
  return (
    <div className="mt-6 text-center flex justify-center space-x-4">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={onSave}
      >
        Save State
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={() => {
          if (window.confirm('Are you sure you want to uncheck all items?')) {
            onReset();
          }
        }}
      >
        Reset All
      </button>
    </div>
  );
};
