import React from 'react';

interface ActionButtonsProps {
  onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onReset }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onReset}
        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 mr-4"
      >
        Reset All
      </button>
    </div>
  );
};
