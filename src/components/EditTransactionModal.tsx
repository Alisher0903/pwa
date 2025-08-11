import React, { useState, useEffect } from "react";
import { X, Edit } from "lucide-react";
import { Transaction, Category } from "../types";

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  categories: Category[];
  onUpdate: (transaction: Transaction) => void;
  darkMode: boolean;
}

export const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
  categories,
  onUpdate,
  darkMode,
}) => {
  const [type, setType] = useState<"income" | "expense">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDescription(transaction.description);
      setDate(transaction.date);
    }
  }, [transaction]);

  const filteredCategories = categories.filter((c) => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction || !amount || !category || !description) return;

    const updatedTransaction: Transaction = {
      ...transaction,
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    onUpdate(updatedTransaction);
    onClose();
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`max-w-md w-full p-6 rounded-2xl border transition-all ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold flex items-center ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <Edit className="w-5 h-5 mr-2" />
            Tranzaksiyani Tahrirlash
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? "hover:bg-gray-700 text-gray-400"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                type === "expense"
                  ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Xarajat
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                type === "income"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Daromad
            </button>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Miqdor (so'm)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Kategoriya
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            >
              <option value="">Kategoriya tanlang</option>
              {filteredCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Tavsif
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Sana
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300"
          >
            Yangilash
          </button>
        </form>
      </div>
    </div>
  );
};
