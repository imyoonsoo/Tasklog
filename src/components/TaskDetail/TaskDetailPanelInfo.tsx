interface TaskDetailPanelInfoProps {
  label: string;
  children: React.ReactNode;
}

export function TaskDetailPanelInfo({
  label,
  children,
}: TaskDetailPanelInfoProps) {
  return (
    <div className="flex items-center gap-2.5 py-1.5 lg:flex-col lg:items-start">
      <span className="w-12.5 text-sm font-semibold text-gray-300">
        {label}
      </span>
      <span className="text-basic font-medium text-gray-100">{children}</span>
    </div>
  );
}
