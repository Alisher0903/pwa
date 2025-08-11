import { useState, useEffect } from "react";
import {
  Transaction,
  Category,
  Budget,
  Stats,
  Profile,
  FilterPeriod,
} from "../types";
import { storage } from "../utils/storage";

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [filter, setFilter] = useState<FilterPeriod>({ type: "all" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      await storage.init();
      const [transactionsData, categoriesData, budgetsData, profileData] =
        await Promise.all([
          storage.getTransactions(),
          storage.getCategories(),
          storage.getBudgets(),
          storage.getProfile(),
        ]);

      setTransactions(
        transactionsData.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      setCategories(categoriesData);
      setBudgets(budgetsData);
      setProfile(profileData);
    } catch (error) {
      console.error("Error initializing data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    if (filter.type === "all") return transactions;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      switch (filter.type) {
        case "day":
          return transactionDate >= today;
        case "week":
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return transactionDate >= weekStart;
        case "month":
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
          return transactionDate >= monthStart;
        case "year":
          const yearStart = new Date(today.getFullYear(), 0, 1);
          return transactionDate >= yearStart;
        default:
          return true;
      }
    });
  };
  const addTransaction = async (
    transaction: Omit<Transaction, "id" | "createdAt">
  ) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    try {
      await storage.addTransaction(newTransaction);
      setTransactions((prev) => [newTransaction, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const updateTransaction = async (transaction: Transaction) => {
    try {
      const updatedTransaction = {
        ...transaction,
        updatedAt: new Date().toISOString(),
      };
      await storage.updateTransaction(updatedTransaction);
      setTransactions((prev) =>
        prev.map((t) => (t.id === transaction.id ? updatedTransaction : t))
      );
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };
  const deleteTransaction = async (id: string) => {
    try {
      await storage.deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const saveProfile = async (
    profileData: Omit<Profile, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProfile: Profile = {
      ...profileData,
      id: profile?.id || crypto.randomUUID(),
      createdAt: profile?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await storage.saveProfile(newProfile);
      setProfile(newProfile);

      // Send to Telegram if not sent before and online
      if (!newProfile.telegramSent && navigator.onLine) {
        await sendToTelegram(newProfile);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const sendToTelegram = async (profileData: Profile) => {
    try {
      const message = `🆕 Yangi SmartBudget foydalanuvchisi:
👤 Ism: ${profileData.name}
📧 Email: ${profileData.email}
📱 Telefon: ${profileData.phone}
📅 Ro'yxatdan o'tgan: ${new Date(profileData.createdAt).toLocaleDateString(
        "uz-UZ"
      )}`;

      const telegramBotToken = "8472430369:AAFtJsXQNnueXH_-i09XXqeG1DVmu8nDdyM";
      const chatId = "1517264719";

      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (response.ok) {
        const updatedProfile = { ...profileData, telegramSent: true };
        await storage.saveProfile(updatedProfile);
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error);
    }
  };
  const addBudget = async (budget: Omit<Budget, "id" | "createdAt">) => {
    const newBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    try {
      await storage.addBudget(newBudget);
      setBudgets((prev) => [...prev, newBudget]);
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const getStats = (): Stats => {
    const filteredTransactions = filterTransactions(transactions);

    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryStats: Record<string, number> = {};
    const categoryIncomeStats: Record<string, number> = {};

    filteredTransactions.forEach((t) => {
      if (t.type === "expense") {
        categoryStats[t.category] = (categoryStats[t.category] || 0) + t.amount;
      } else {
        categoryIncomeStats[t.category] =
          (categoryIncomeStats[t.category] || 0) + t.amount;
      }
    });

    const monthlyStats: Record<string, { income: number; expenses: number }> =
      {};
    filteredTransactions.forEach((t) => {
      const month = t.date.substring(0, 7);
      if (!monthlyStats[month]) {
        monthlyStats[month] = { income: 0, expenses: 0 };
      }
      monthlyStats[month][t.type === "income" ? "income" : "expenses"] +=
        t.amount;
    });

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categoryStats,
      categoryIncomeStats,
      monthlyStats,
    };
  };

  const exportData = async (): Promise<string> => {
    return await storage.exportData();
  };

  return {
    transactions,
    allTransactions: transactions,
    categories,
    budgets,
    profile,
    filter,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    saveProfile,
    addBudget,
    setFilter,
    getStats,
    exportData,
  };
};
