import React from "react";
import { Moon, Sun, Download, Wallet } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onExport: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  darkMode,
  toggleDarkMode,
  onExport,
}) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"
          : "bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800/70 border-gray-700"
            : "bg-white/70 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1
                  className={`text-xl font-bold transition-colors ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  SmartBudget
                </h1>
                <p
                  className={`text-sm transition-colors ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Shaxsiy Moliya Boshqaruvi
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onExport}
                className={`flex justify-center items-center p-2 rounded-lg transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                title="Ma'lumotlarni export qilish"
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={toggleDarkMode}
                className={`flex justify-center items-center p-2 rounded-lg transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8 overflow-hidden">
        {children}
      </main>
    </div>
  );
};
