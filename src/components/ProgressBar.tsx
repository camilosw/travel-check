import { Progress } from '../types';

interface Props {
  progress: Progress;
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">
          Progress: {progress.completed} of {progress.total} (
          {progress.percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress.percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
