import React from "react";
import { AppModule } from "../types";

interface ModuleGridProps {
  darkMode: boolean;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ darkMode }) => {
  const modules: AppModule[] = [
    {
      id: "finance",
      name: "Moliya",
      icon: "💰",
      route: "/finance",
      enabled: true,
    },
    {
      id: "daily-planner",
      name: "Kundalik Reja",
      icon: "📅",
      route: "/planner",
      enabled: false,
      comingSoon: true,
    },
    {
      id: "health",
      name: "Tibbiy Yordam",
      icon: "🏥",
      route: "/health",
      enabled: false,
      comingSoon: true,
    },
    {
      id: "emergency",
      name: "SOS",
      icon: "🚨",
      route: "/emergency",
      enabled: false,
      comingSoon: true,
    },
    {
      id: "analytics",
      name: "Tahlil",
      icon: "📊",
      route: "/analytics",
      enabled: false,
      comingSoon: true,
    },
    {
      id: "community",
      name: "Jamoa",
      icon: "👥",
      route: "/community",
      enabled: false,
      comingSoon: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {modules.map((module) => (
        <div
          key={module.id}
          className={`relative p-4 rounded-xl border transition-all ${
            module.enabled
              ? `cursor-pointer hover:scale-105 hover:shadow-lg ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70"
                    : "bg-white border-gray-200 hover:shadow-md"
                }`
              : `opacity-60 ${
                  darkMode
                    ? "bg-gray-800/30 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`
          }`}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">{module.icon}</div>
            <h3
              className={`font-semibold text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {module.name}
            </h3>
            {module.comingSoon && (
              <span
                className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
                  darkMode
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                Tez orada
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
