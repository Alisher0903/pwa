import React from "react";
import { Trash2, Calendar, Tag, Edit } from "lucide-react";
import { Transaction, Category } from "../types";

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
  darkMode: boolean;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  categories,
  onDelete,
  onEdit,
  darkMode,
}) => {
  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    return category?.icon || "📄";
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName);
    return category?.color || "#6b7280";
  };

  if (transactions.length === 0) {
    return (
      <div
        className={`text-center py-12 rounded-2xl border ${
          darkMode
            ? "bg-gray-800/30 border-gray-700 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">Tranzaksiyalar yo'q</h3>
        <p>Birinchi tranzaksiyani qo'shish uchun + tugmasini bosing</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <h2
        className={`text-xl font-bold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        So'nggi Tranzaksiyalar
      </h2>

      <div className="space-y-3">
        {transactions.slice(0, 10).map((transaction) => (
          <div
            key={transaction.id}
            className={`p-3 sm:p-4 rounded-xl border transition-all w-full ${
              darkMode
                ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                : "bg-white border-gray-200 hover:shadow-md"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0"
                  style={{
                    backgroundColor: `${getCategoryColor(
                      transaction.category
                    )}20`,
                  }}
                >
                  {getCategoryIcon(transaction.category)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold text-sm sm:text-base truncate ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {transaction.description}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mt-1 gap-1 sm:gap-0">
                    <div className="flex items-center space-x-1 min-w-0">
                      <Tag
                        className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm truncate ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 min-w-0">
                      <Calendar
                        className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {new Date(transaction.date).toLocaleDateString("uz-UZ")} {new Date(transaction.createdAt).toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                <div className="text-right min-w-0">
                  <p
                    className={`text-sm sm:text-lg font-bold truncate ${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount.toLocaleString("uz-UZ")}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    so'm
                  </p>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => onEdit(transaction)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 ${
                      darkMode
                        ? "hover:bg-blue-500/20 text-gray-400 hover:text-blue-400"
                        : "hover:bg-blue-50 text-gray-500 hover:text-blue-600"
                    }`}
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0 ${
                      darkMode
                        ? "hover:bg-red-500/20 text-gray-400 hover:text-red-400"
                        : "hover:bg-red-50 text-gray-500 hover:text-red-600"
                    }`}
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
