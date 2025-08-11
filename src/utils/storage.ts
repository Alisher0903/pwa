import { Transaction, Category, Budget, Profile } from "../types";

const DB_NAME = "SmartBudgetDB";
const DB_VERSION = 1;

class StorageManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains("transactions")) {
          db.createObjectStore("transactions", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("categories")) {
          const categoryStore = db.createObjectStore("categories", {
            keyPath: "id",
          });
          this.seedCategories(categoryStore);
        }

        if (!db.objectStoreNames.contains("budgets")) {
          db.createObjectStore("budgets", { keyPath: "id" });
        }

        if (!db.objectStoreNames.contains("profiles")) {
          db.createObjectStore("profiles", { keyPath: "id" });
        }
      };
    });
  }

  private seedCategories(store: IDBObjectStore): void {
    const defaultCategories: Category[] = [
      {
        id: "1",
        name: "Oziq-ovqat",
        icon: "🍽️",
        color: "#f59e0b",
        type: "expense",
      },
      {
        id: "2",
        name: "Transport",
        icon: "🚗",
        color: "#3b82f6",
        type: "expense",
      },
      {
        id: "3",
        name: "Ko'ngilochar",
        icon: "🎬",
        color: "#ec4899",
        type: "expense",
      },
      {
        id: "4",
        name: "Kommunal",
        icon: "🏠",
        color: "#10b981",
        type: "expense",
      },
      {
        id: "5",
        name: "Sog'liq",
        icon: "🏥",
        color: "#ef4444",
        type: "expense",
      },
      {
        id: "6",
        name: "Ta'lim",
        icon: "📚",
        color: "#8b5cf6",
        type: "expense",
      },
      {
        id: "11",
        name: "Ijara",
        icon: "🏠",
        color: "#8b5cf6",
        type: "expense",
      },
      {
        id: "12",
        name: "Kiyim-kechak",
        icon: "👕",
        color: "#f97316",
        type: "expense",
      },
      {
        id: "13",
        name: "Texnologiya",
        icon: "📱",
        color: "#06b6d4",
        type: "expense",
      },
      {
        id: "14",
        name: "Sport",
        icon: "⚽",
        color: "#84cc16",
        type: "expense",
      },
      {
        id: "15",
        name: "Sayohat",
        icon: "✈️",
        color: "#f59e0b",
        type: "expense",
      },
      { id: "7", name: "Maosh", icon: "💰", color: "#059669", type: "income" },
      {
        id: "8",
        name: "Freelance",
        icon: "💻",
        color: "#0891b2",
        type: "income",
      },
      {
        id: "9",
        name: "Investitsiya",
        icon: "📈",
        color: "#7c3aed",
        type: "income",
      },
      {
        id: "10",
        name: "Sovg'a",
        icon: "🎁",
        color: "#dc2626",
        type: "income",
      },
      {
        id: "16",
        name: "Biznes",
        icon: "🏢",
        color: "#0d9488",
        type: "income",
      },
      {
        id: "17",
        name: "Qo'shimcha ish",
        icon: "💼",
        color: "#7c2d12",
        type: "income",
      },
      {
        id: "18",
        name: "Ijara daromadi",
        icon: "🏠",
        color: "#166534",
        type: "income",
      },
    ];

    defaultCategories.forEach((category) => store.add(category));
  }

  async getTransactions(): Promise<Transaction[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["transactions"], "readonly");
      const store = transaction.objectStore("transactions");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const dbTransaction = this.db!.transaction(["transactions"], "readwrite");
      const store = dbTransaction.objectStore("transactions");
      const request = store.add(transaction);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["transactions"], "readwrite");
      const store = transaction.objectStore("transactions");
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getCategories(): Promise<Category[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["categories"], "readonly");
      const store = transaction.objectStore("categories");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getBudgets(): Promise<Budget[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["budgets"], "readonly");
      const store = transaction.objectStore("budgets");
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addBudget(budget: Budget): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["budgets"], "readwrite");
      const store = transaction.objectStore("budgets");
      const request = store.add(budget);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async updateTransaction(transaction: Transaction): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const dbTransaction = this.db!.transaction(["transactions"], "readwrite");
      const store = dbTransaction.objectStore("transactions");
      const request = store.put(transaction);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getProfile(): Promise<Profile | null> {
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["profiles"], "readonly");
      const store = transaction.objectStore("profiles");
      const request = store.getAll();

      request.onsuccess = () => {
        const profiles = request.result;
        resolve(profiles.length > 0 ? profiles[0] : null);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveProfile(profile: Profile): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(["profiles"], "readwrite");
      const store = transaction.objectStore("profiles");
      const request = store.put(profile);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  exportData(): Promise<string> {
    return new Promise(async (resolve) => {
      const transactions = await this.getTransactions();
      const budgets = await this.getBudgets();
      const data = {
        transactions,
        budgets,
        exportDate: new Date().toISOString(),
      };
      resolve(JSON.stringify(data, null, 2));
    });
  }
}

export const storage = new StorageManager();
