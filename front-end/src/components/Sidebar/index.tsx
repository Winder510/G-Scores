import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
}

const Sidebar = () => {
  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/" },
    { label: "Search Scores", path: "/search" },
    { label: "Reports", path: "/reports" },
    { label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-yellow-400 via-green-500 to-teal-500">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item: MenuItem) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block py-2 px-4 text-gray-900 hover:bg-white/20 rounded transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
