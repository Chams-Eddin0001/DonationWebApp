interface ProgressBarProps {
  current: number;
  goal: number;
  showLabel?: boolean;
}

export function ProgressBar({ current, goal, showLabel = true }: ProgressBarProps) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className="font-semibold text-purple-600">${current.toLocaleString()} raised</span>
          <span>of ${goal.toLocaleString()} goal</span>
        </div>
      )}
    </div>
  );
}
