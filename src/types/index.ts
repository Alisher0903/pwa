export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
}

export interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'weekly' | 'monthly';
  createdAt: string;
}

export interface Stats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  categoryStats: Record<string, number>;
  categoryIncomeStats: Record<string, number>;
  monthlyStats: Record<string, { income: number; expenses: number }>;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  telegramSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterPeriod {
  type: 'all' | 'day' | 'week' | 'month' | 'year';
  value?: string;
}

export interface AppModule {
  id: string;
  name: string;
  icon: string;
  route: string;
  enabled: boolean;
  comingSoon?: boolean;
}