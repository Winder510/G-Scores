import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";
import { useEffect, useState } from "react";

interface MenuItem {
  label: string;
  path: string;
  icon: any;
}

const Sidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/closed

  const menuItems: MenuItem[] = [
    {
      label: "Dashboard",
      path: "/",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      label: "Search Scores",
      path: "/search",
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
    },
    {
      label: "Reports",
      path: "/reports",
      icon: <ChartBarIcon className="w-6 h-6" />,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <Cog6ToothIcon className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } min-h-90 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {isOpen && (
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Menu
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 pb-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    title={isOpen ? undefined : item.label}
                  >
                    {item.icon}
                    {isOpen && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          onClick={toggleTheme}
          className={`m-auto mb-10 w-10 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
            !isOpen && "mx-auto"
          }`}
        >
          {theme === "light" ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
