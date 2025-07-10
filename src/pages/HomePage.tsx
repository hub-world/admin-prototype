import { format } from "date-fns";
import {
  CalendarIcon,
  CheckSquareIcon,
  CircleDotIcon,
  DoorOpenIcon,
  EuroIcon,
  MessageSquareIcon,
} from "lucide-react";

export function HomePage() {
  const today = new Date();

  // Placeholder data for the dashboard
  const stats = {
    occupancyRate: "High",
    revenueChange: "Up",
    todayActivity: "Busy",
    pendingItems: "Few",
    unreadMessages: 5,
  };

  const recentActivity = [
    {
      id: 1,
      type: "checkin",
      title: "Emma Johnson checked in",
      subtitle: "Unit P042 - Premium",
      time: "10 minutes ago",
      initials: "EJ",
      color: "bg-success",
    },
    {
      id: 2,
      type: "issue",
      title: "AC unit issue reported",
      subtitle: "Unit B015 - Business",
      time: "25 minutes ago",
      initials: "AC",
      color: "bg-warning",
    },
    {
      id: 3,
      type: "checkout",
      title: "Marcus Chen checked out",
      subtitle: "Unit E089 - Economy",
      time: "1 hour ago",
      initials: "MC",
      color: "bg-info",
    },
    {
      id: 4,
      type: "payment",
      title: "Payment received",
      subtitle: "Sophia Williams - €2,450",
      time: "2 hours ago",
      initials: "SW",
      color: "bg-primary",
    },
    {
      id: 5,
      type: "inquiry",
      title: "New booking inquiry",
      subtitle: "3-month stay request",
      time: "3 hours ago",
      initials: "BQ",
      color: "bg-secondary",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Housekeeping inspection",
      time: "14:00",
      unit: "Floor 3",
      type: "housekeeping",
    },
    {
      id: 2,
      title: "New guest arrival",
      time: "16:30",
      unit: "Unit F008",
      type: "checkin",
    },
    {
      id: 3,
      title: "Maintenance scheduled",
      time: "18:00",
      unit: "Unit P021",
      type: "maintenance",
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-base-100 p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-base-content">Admin</h1>
        <p className="text-base-content/70">
          {format(today, "EEEE, MMMM d, yyyy")}
        </p>
      </div>

      {/* Key Stats */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="stats overflow-hidden shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <DoorOpenIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Occupancy Rate</div>
            <div className="stat-value text-primary">{stats.occupancyRate}</div>
            <div className="stat-desc">Most units occupied</div>
          </div>
        </div>

        <div className="stats overflow-hidden shadow">
          <div className="stat">
            <div className="stat-figure text-success">
              <EuroIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Monthly Revenue</div>
            <div className="stat-value text-success">{stats.revenueChange}</div>
            <div className="stat-desc">Compared to last month</div>
          </div>
        </div>

        <div className="stats overflow-hidden shadow">
          <div className="stat">
            <div className="stat-figure text-info">
              <CalendarIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Today's Activity</div>
            <div className="stat-value text-info">{stats.todayActivity}</div>
            <div className="stat-desc">Check-ins and check-outs</div>
          </div>
        </div>

        <div className="stats overflow-hidden shadow">
          <div className="stat">
            <div className="stat-figure text-warning">
              <CircleDotIcon className="h-8 w-8" />
            </div>
            <div className="stat-title">Pending Items</div>
            <div className="stat-value text-warning">{stats.pendingItems}</div>
            <div className="stat-desc">Issues and tasks</div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left Column - Takes up 2 columns */}
        <div className="space-y-4 lg:col-span-2">
          {/* Today's Schedule */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-lg">Today's Schedule</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3">
                    <div className="w-12 font-mono text-sm text-base-content/70">
                      {event.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-base-content/70">
                        {event.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost btn-sm">View Calendar</button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Recent Activity</h2>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="avatar avatar-placeholder">
                      <div
                        className={`w-10 rounded-full text-white ${activity.color}`}
                      >
                        <span className="text-sm font-medium">
                          {activity.initials}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-base-content/70">
                        {activity.subtitle}
                      </p>
                    </div>
                    <div className="text-xs text-base-content/60">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-ghost btn-sm">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-lg">Quick Actions</h2>
              <div className="space-y-2">
                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-base-200 p-3 hover:bg-base-300">
                  <div className="flex items-center gap-3">
                    <MessageSquareIcon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Messages</span>
                  </div>
                  <div className="badge badge-sm badge-primary">
                    {stats.unreadMessages}
                  </div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-base-200 p-3 hover:bg-base-300">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">Add Booking</span>
                  </div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-base-200 p-3 hover:bg-base-300">
                  <div className="flex items-center gap-3">
                    <CircleDotIcon className="h-5 w-5 text-warning" />
                    <span className="text-sm font-medium">Report Issue</span>
                  </div>
                </div>

                <div className="flex cursor-pointer items-center justify-between rounded-lg bg-base-200 p-3 hover:bg-base-300">
                  <div className="flex items-center gap-3">
                    <CheckSquareIcon className="h-5 w-5 text-info" />
                    <span className="text-sm font-medium">Create Task</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Status Overview */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title text-lg">Unit Overview</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Economy</span>
                  <span className="text-sm font-medium">Most occupied</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Premium</span>
                  <span className="text-sm font-medium">High demand</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Business</span>
                  <span className="text-sm font-medium">Nearly full</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">First</span>
                  <span className="text-sm font-medium">Available</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Capsules</span>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
