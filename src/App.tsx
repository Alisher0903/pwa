import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import { StatsCards } from "./components/StatsCards";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";
import { CategoryChart } from "./components/CategoryChart";
import { CategoryIncomeChart } from "./components/CategoryIncomeChart";
import { FilterTabs } from "./components/FilterTabs";
import { ProfileModal } from "./components/ProfileModal";
import { EditTransactionModal } from "./components/EditTransactionModal";
import { ModuleGrid } from "./components/ModuleGrid";
import { useFinance } from "./hooks/useFinance";
import { Transaction } from "./types";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const [showProfile, setShowProfile] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const {
    transactions,
    categories,
    profile,
    filter,
    loading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    saveProfile,
    setFilter,
    getStats,
    exportData,
  } = useFinance();

  const stats = getStats();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `smartbudget-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg">SmartBudget yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(!darkMode)}
      onExport={handleExport}
      onProfileClick={() => setShowProfile(true)}
    >
      <div className="space-y-8">
        <ModuleGrid darkMode={darkMode} />
        
        <FilterTabs 
          filter={filter}
          onFilterChange={setFilter}
          darkMode={darkMode}
        />
        
        <StatsCards stats={stats} darkMode={darkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <TransactionList
              transactions={transactions}
              categories={categories}
              onDelete={deleteTransaction}
              onEdit={setEditingTransaction}
              darkMode={darkMode}
            />
          </div>

          <div>
            <CategoryChart
              stats={stats}
              categories={categories}
              darkMode={darkMode}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <CategoryIncomeChart
              stats={stats}
              categories={categories}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>

      <TransactionForm
        categories={categories}
        onAdd={addTransaction}
        darkMode={darkMode}
      />
      
      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        profile={profile}
        onSave={saveProfile}
        darkMode={darkMode}
      />
      
      <EditTransactionModal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        transaction={editingTransaction}
        categories={categories}
        onUpdate={updateTransaction}
        darkMode={darkMode}
      />
    </Layout>
  );
}

export default App;
