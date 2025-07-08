import {
  BarChart3Icon,
  Building2Icon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";

export function HomePage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">Home</h1>
        <p className="mt-2 text-base-content/70">
          Welcome to Urban Hub Admin Panel
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <UsersIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">1,234</div>
            <div className="stat-desc">↗︎ 12% from last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <Building2Icon className="h-8 w-8" />
            </div>
            <div className="stat-title">Properties</div>
            <div className="stat-value text-secondary">89</div>
            <div className="stat-desc">↗︎ 5% from last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <TrendingUpIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value text-success">$45,231</div>
            <div className="stat-desc">↗︎ 8% from last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-info">
              <BarChart3Icon className="h-8 w-8" />
            </div>
            <div className="stat-title">Occupancy</div>
            <div className="stat-value text-info">94%</div>
            <div className="stat-desc">↗︎ 2% from last month</div>
          </div>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-8 rounded-full bg-neutral text-neutral-content">
                    <span className="text-xs">JD</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe registered</p>
                  <p className="text-xs text-base-content/70">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-8 rounded-full bg-primary text-primary-content">
                    <span className="text-xs">AS</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New property added</p>
                  <p className="text-xs text-base-content/70">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="avatar avatar-placeholder">
                  <div className="w-8 rounded-full bg-secondary text-secondary-content">
                    <span className="text-xs">MJ</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-base-content/70">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-primary">
                <UsersIcon className="h-4 w-4" />
                Add User
              </button>
              <button className="btn btn-secondary">
                <Building2Icon className="h-4 w-4" />
                Add Property
              </button>
              <button className="btn btn-accent">
                <BarChart3Icon className="h-4 w-4" />
                View Reports
              </button>
              <button className="btn btn-info">
                <TrendingUpIcon className="h-4 w-4" />
                Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
