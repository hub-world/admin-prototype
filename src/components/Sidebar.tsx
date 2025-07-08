import classNames from "classnames";
import { Building2Icon, HomeIcon, SettingsIcon, UsersIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

const menuItems = [
  { icon: HomeIcon, label: "Home", path: "/" },
  { icon: UsersIcon, label: "Users", path: "/users" },
  { icon: Building2Icon, label: "Properties", path: "/properties" },
  { icon: SettingsIcon, label: "Settings", path: "/settings" },
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();

  return (
    <div
      className={classNames("flex h-full w-48 flex-col bg-base-200", className)}
    >
      {/* Logo/Title */}
      <div className="m-6 mb-4">
        <h1 className="text-xl font-bold text-base-content">Urban Hub.</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="menu w-full">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={classNames("flex items-center gap-3", {
                  active: location.pathname === item.path,
                })}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
