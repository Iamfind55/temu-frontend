import { SearchX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface EmptyPageProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyPage({
  icon: Icon = SearchX, // 👈 Default icon if none provided
  title,
  description,
}: EmptyPageProps) {
  return (
    <div className="text-center py-8">
      <Icon className="h-8 w-8 text-gray-300 mx-auto mb-4 animate-pulse" /> {/* 👈 Use Icon here */}
      <p className="text-gray-500">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
