import { useState, useEffect } from 'react';
import { Transaction, Category, Budget, Stats } from '../types';
import { storage } from '../utils/storage';

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      await storage.init();
      const [transactionsData, categoriesData, budgetsData] = await Promise.all([
        storage.getTransactions(),
        storage.getCategories(),
        storage.getBudgets()
      ]);
      
      setTransactions(transactionsData.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
      setCategories(categoriesData);
      setBudgets(budgetsData);
    } catch (error) {
      console.error('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    try {
      await storage.addTransaction(newTransaction);
      setTransactions(prev => [newTransaction, ...prev]);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await storage.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const addBudget = async (budget: Omit<Budget, 'id' | 'createdAt'>) => {
    const newBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };

    try {
      await storage.addBudget(newBudget);
      setBudgets(prev => [...prev, newBudget]);
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const getStats = (): Stats => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categoryStats: Record<string, number> = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        categoryStats[t.category] = (categoryStats[t.category] || 0) + t.amount;
      }
    });

    const monthlyStats: Record<string, { income: number; expenses: number }> = {};
    transactions.forEach(t => {
      const month = t.date.substring(0, 7);
      if (!monthlyStats[month]) {
        monthlyStats[month] = { income: 0, expenses: 0 };
      }
      monthlyStats[month][t.type === 'income' ? 'income' : 'expenses'] += t.amount;
    });

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categoryStats,
      monthlyStats
    };
  };

  const exportData = async (): Promise<string> => {
    return await storage.exportData();
  };

  return {
    transactions,
    categories,
    budgets,
    loading,
    addTransaction,
    deleteTransaction,
    addBudget,
    getStats,
    exportData
  };
};