import { BellIcon, ChevronDownIcon, SearchIcon } from "lucide-react";

export function Topbar() {
  return (
    <div className="flex items-center justify-between border-b border-base-300 bg-base-100 px-4 py-2">
      {/* Search Bar */}
      <label className="input rounded-full">
        <SearchIcon className="text-base-content/40" />
        <input type="search" placeholder="Search..." />
      </label>

      {/* Right side - Notifications and User */}
      <div className="flex items-center">
        {/* Notifications */}
        <button className="btn btn-circle btn-ghost">
          <BellIcon className="h-5 w-5" />
        </button>

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <button tabIndex={0} className="btn flex items-center px-2 btn-ghost">
            <div className="avatar avatar-placeholder">
              <div className="w-8 rounded-full bg-neutral text-neutral-content">
                <span>JD</span>
              </div>
            </div>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Help</a>
            </li>
            <div className="divider my-0"></div>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
