import React, { useMemo } from "react";
import { Stats, Category } from "../types";

interface CategoryIncomeChartProps {
  stats: Stats;
  categories: Category[];
  darkMode: boolean;
}

export const CategoryIncomeChart: React.FC<CategoryIncomeChartProps> = ({
  stats,
  categories,
  darkMode,
}) => {
  const chartData = useMemo(() => {
    const data = Object.entries(stats.categoryIncomeStats)
      .map(([name, amount]) => {
        const category = categories.find((c) => c.name === name);
        return {
          name,
          amount,
          percentage: (amount / stats.totalIncome) * 100,
          color: category?.color || "#6b7280",
          icon: category?.icon || "📄",
        };
      })
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);

    return data;
  }, [stats.categoryIncomeStats, stats.totalIncome, categories]);

  if (chartData.length === 0) {
    return (
      <div
        className={`p-6 rounded-2xl border ${
          darkMode
            ? "bg-gray-800/30 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Kategoriyalar bo'yicha Daromadlar
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">💰</div>
          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
            Hozircha daromadlar yo'q
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
        darkMode ? "bg-gray-800/30 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <h3
        className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Kategoriyalar bo'yicha Daromadlar
      </h3>

      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-base sm:text-lg">{item.icon}</span>
                <span
                  className={`font-medium text-sm sm:text-base truncate ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold text-sm sm:text-base text-green-500`}
                >
                  +{item.amount.toLocaleString("uz-UZ")}
                  <span className="text-xs ml-1">so'm</span>
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.percentage.toFixed(1)}%
                </div>
              </div>
            </div>

            <div
              className={`h-2 sm:h-3 rounded-full overflow-hidden ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
