import classNames from "classnames";
import {
  Building2Icon,
  CalendarIcon,
  ChartNoAxesCombinedIcon,
  CheckSquareIcon,
  CircleDotIcon,
  ClipboardListIcon,
  ContactRoundIcon,
  DoorOpenIcon,
  EuroIcon,
  HomeIcon,
  MessageSquareIcon,
  ShieldIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import { NavLink } from "react-router";

const menuItems = [
  { icon: HomeIcon, label: "Home", path: "/" },
  { icon: MessageSquareIcon, label: "Messages", path: "/messages" },
  { icon: CalendarIcon, label: "Reservations", path: "/reservations" },
  { icon: ContactRoundIcon, label: "Customers", path: "/customers" },

  {
    icon: DoorOpenIcon,
    label: "Apartments",
    path: "/apartments",
    divider: true,
  },
  { icon: Building2Icon, label: "Properties", path: "/properties" },
  { icon: TagIcon, label: "Pricing", path: "/pricing" },

  { icon: CircleDotIcon, label: "Issues", path: "/issues", divider: true },
  { icon: CheckSquareIcon, label: "Tasks", path: "/tasks" },
  { icon: ClipboardListIcon, label: "Housekeeping", path: "/housekeeping" },
  { icon: ShieldIcon, label: "Security", path: "/security" },

  {
    icon: ChartNoAxesCombinedIcon,
    label: "Dashboard",
    path: "/dashboard",
    divider: true,
  },
  { icon: EuroIcon, label: "Finance", path: "/finance" },
  { icon: UsersIcon, label: "Admins", path: "/admins" },
];

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <div
      className={classNames("flex h-full w-48 flex-col bg-base-200", className)}
    >
      {/* Logo/Title */}
      <div className="mx-6 my-4">
        <h1 className="text-xl font-bold text-base-content">Urban Hub.</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="menu w-full">
          {menuItems.map((item) => (
            <>
              {item.divider && (
                <hr
                  key={`divider-${item.label}`}
                  className="my-2 border-base-300"
                />
              )}
              <li key={item.label}>
                <NavLink
                  to={item.path ?? "/404"}
                  className={({ isActive }) =>
                    classNames(
                      "flex items-center gap-3",
                      isActive && "menu-focus",
                    )
                  }
                >
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.label}
                </NavLink>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
}
