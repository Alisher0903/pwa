import React from "react";
import { FilterPeriod } from "../types";

interface FilterTabsProps {
  filter: FilterPeriod;
  onFilterChange: (filter: FilterPeriod) => void;
  darkMode: boolean;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  filter,
  onFilterChange,
  darkMode,
}) => {
  const tabs = [
    { type: "all" as const, label: "Barchasi" },
    { type: "day" as const, label: "Bugun" },
    { type: "week" as const, label: "Hafta" },
    { type: "month" as const, label: "Oy" },
    { type: "year" as const, label: "Yil" },
  ];

  return (
    <div className="flex space-x-1 overflow-x-auto tab-scroll-none p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => onFilterChange({ type: tab.type })}
          className={`min-w-20 flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all ${
            filter.type === tab.type
              ? darkMode
                ? "bg-white text-gray-900 shadow-sm"
                : "bg-white text-gray-900 shadow-sm"
              : darkMode
              ? "text-gray-400 hover:text-gray-300"
              : "text-gray-300 hover:text-gray-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
