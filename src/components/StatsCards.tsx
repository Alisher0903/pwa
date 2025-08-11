import React from "react";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";
import { Stats } from "../types";

interface StatsCardsProps {
  stats: Stats;
  darkMode: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, darkMode }) => {
  const cards = [
    {
      title: "Umumiy Daromad",
      value: stats.totalIncome.toLocaleString("uz-UZ"),
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
      bgColor: darkMode ? "bg-green-500/10" : "bg-green-50",
    },
    {
      title: "Umumiy Xarajat",
      value: stats.totalExpenses.toLocaleString("uz-UZ"),
      icon: TrendingDown,
      color: "from-red-500 to-pink-600",
      bgColor: darkMode ? "bg-red-500/10" : "bg-red-50",
    },
    {
      title: "Balans",
      value: stats.balance.toLocaleString("uz-UZ"),
      icon: Wallet,
      color:
        stats.balance >= 0
          ? "from-blue-500 to-indigo-600"
          : "from-red-500 to-pink-600",
      bgColor: darkMode
        ? stats.balance >= 0
          ? "bg-blue-500/10"
          : "bg-red-500/10"
        : stats.balance >= 0
        ? "bg-blue-50"
        : "bg-red-50",
    },
    {
      title: "Kategoriyalar",
      value: Object.keys(stats.categoryStats).length.toString(),
      icon: Target,
      color: "from-purple-500 to-violet-600",
      bgColor: darkMode ? "bg-purple-500/10" : "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-3 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            darkMode
              ? "bg-gray-800/50 border-gray-700 shadow-lg"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {card.title}
              </p>
              <p
                className={`text-lg sm:text-2xl font-bold mt-1 sm:mt-2 transition-colors ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {card.title.includes("som") ? "" : ""}
                {card.value}
                <span className="text-xs sm:text-sm ml-1">
                  {card.title.includes("Kategoriyalar") ? "" : "so'm"}
                </span>
              </p>
            </div>
            <div
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${card.bgColor}`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${card.color} rounded-md sm:rounded-lg flex items-center justify-center`}
              >
                <card.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
