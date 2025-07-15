import classNames from "classnames";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckSquareIcon,
  DollarSignIcon,
  ExternalLinkIcon,
  MailIcon,
  MessageCircleIcon,
  PackageIcon,
  ReplyIcon,
  StarIcon,
  TrendingUpIcon,
  UserCheckIcon,
  WrenchIcon,
} from "lucide-react";

// Mock data interfaces
interface UrgentMessage {
  id: string;
  subject: string;
  sender: string;
  source: "app" | "email" | "booking.com" | "airbnb" | "expedia";
  priority: "high" | "urgent";
  category: "inquiry" | "booking" | "complaint" | "support" | "cancellation";
  apartment?: string;
  timestamp: Date;
}

interface TodayScheduleItem {
  id: string;
  type:
    | "contractor"
    | "delivery"
    | "inspection"
    | "maintenance"
    | "guest_issue"
    | "housekeeping_check";
  title: string;
  time: string;
  unit?: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
  status?: "pending" | "confirmed" | "completed";
}

interface OccupancyData {
  unitType: string;
  total: number;
  occupied: number;
  availableToday: number;
  color: string;
}

interface BookingMetrics {
  newCustomersToday: number;
  checkInsToday: number;
  bookingsTrend: number; // percentage change
  monthlyRecurringRevenue: number;
  paymentSuccessRate: number;
  outstandingPayments: number;
  averageStayDuration: number;
}

interface GuestSatisfaction {
  averageRating: number;
  totalReviews: number;
  recentReviews: Array<{
    id: string;
    guestName: string;
    rating: number;
    comment: string;
    date: Date;
    unit: string;
  }>;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export function HomePage() {
  // Mock urgent messages that need attention
  const urgentMessages: UrgentMessage[] = [
    {
      id: "1",
      subject: "Desk lamp not working - Unit 204",
      sender: "Alex Chen",
      source: "app",
      priority: "high",
      category: "support",
      apartment: "204",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: "2",
      subject: "Cancellation Request - Project Cancelled",
      sender: "Jordan Taylor",
      source: "airbnb",
      priority: "urgent",
      category: "cancellation",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
    {
      id: "3",
      subject: "Kitchen drawer handle loose",
      sender: "Sam Wilson",
      source: "email",
      priority: "high",
      category: "complaint",
      apartment: "205",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  ];

  // Mock schedule for three days
  const allSchedule: (TodayScheduleItem & { day: number })[] = [
    // Today (day 0)
    {
      id: "1",
      day: 0,
      type: "contractor",
      title: "Let in plumber",
      time: "09:00",
      unit: "B015",
      description: "Johnson Plumbing for sink repair",
      priority: "high",
      status: "confirmed",
    },
    {
      id: "2",
      day: 0,
      type: "delivery",
      title: "Furniture delivery",
      time: "10:30",
      unit: "P042",
      description: "New sofa for unit P042",
      status: "pending",
    },
    {
      id: "3",
      day: 0,
      type: "contractor",
      title: "Electrician access",
      time: "11:00",
      unit: "E089",
      description: "Elite Electrical for outlet repair",
      priority: "urgent",
      status: "confirmed",
    },
    {
      id: "4",
      day: 0,
      type: "inspection",
      title: "Safety inspection",
      time: "14:00",
      unit: "Multiple",
      description: "Monthly fire safety check - Floor 2",
      status: "pending",
    },
    {
      id: "5",
      day: 0,
      type: "guest_issue",
      title: "Guest assistance",
      time: "15:30",
      unit: "F008",
      description: "Help with TV setup",
      priority: "medium",
      status: "pending",
    },
    {
      id: "6",
      day: 0,
      type: "housekeeping_check",
      title: "Quality check",
      time: "16:00",
      unit: "Multiple",
      description: "Review cleaning of 8 units",
      status: "pending",
    },
    // Tomorrow (day 1)
    {
      id: "7",
      day: 1,
      type: "contractor",
      title: "HVAC repair",
      time: "09:30",
      unit: "C023",
      description: "Davis HVAC for heating system",
      priority: "urgent",
      status: "confirmed",
    },
    {
      id: "8",
      day: 1,
      type: "delivery",
      title: "Appliance delivery",
      time: "11:00",
      unit: "E067",
      description: "New washing machine",
      status: "pending",
    },
    {
      id: "9",
      day: 1,
      type: "maintenance",
      title: "Roof inspection",
      time: "13:00",
      unit: "Multiple",
      description: "Quarterly roof maintenance check",
      status: "pending",
    },
    {
      id: "10",
      day: 1,
      type: "guest_issue",
      title: "Internet setup",
      time: "14:30",
      unit: "P021",
      description: "Help guest with WiFi connection",
      priority: "medium",
      status: "pending",
    },
    {
      id: "11",
      day: 1,
      type: "contractor",
      title: "Window repair",
      time: "16:00",
      unit: "F003",
      description: "Secure Windows for broken latch",
      priority: "high",
      status: "confirmed",
    },
    // Day after tomorrow (day 2)
    {
      id: "12",
      day: 2,
      type: "inspection",
      title: "Fire safety check",
      time: "10:00",
      unit: "Multiple",
      description: "Weekly fire equipment inspection",
      status: "pending",
    },
    {
      id: "13",
      day: 2,
      type: "contractor",
      title: "Locksmith service",
      time: "11:30",
      unit: "B018",
      description: "Key replacement for unit B018",
      priority: "medium",
      status: "confirmed",
    },
    {
      id: "14",
      day: 2,
      type: "delivery",
      title: "Cleaning supplies",
      time: "12:00",
      unit: "Storage",
      description: "Monthly cleaning supply delivery",
      status: "pending",
    },
    {
      id: "15",
      day: 2,
      type: "housekeeping_check",
      title: "Deep clean review",
      time: "14:00",
      unit: "Multiple",
      description: "Review deep cleaning of 5 units",
      status: "pending",
    },
    {
      id: "16",
      day: 2,
      type: "maintenance",
      title: "Elevator service",
      time: "15:00",
      unit: "Building",
      description: "Monthly elevator maintenance",
      priority: "high",
      status: "confirmed",
    },
    {
      id: "17",
      day: 2,
      type: "guest_issue",
      title: "Key assistance",
      time: "17:00",
      unit: "C044",
      description: "Guest locked out, need spare key",
      priority: "urgent",
      status: "pending",
    },
  ];

  const todaySchedule = allSchedule.filter((item) => item.day === 0);

  // Mock occupancy data
  const occupancyData: OccupancyData[] = [
    {
      unitType: "Economy",
      total: 123,
      occupied: 108,
      availableToday: 5,
      color: "bg-slate-400",
    },
    {
      unitType: "Premium",
      total: 98,
      occupied: 89,
      availableToday: 3,
      color: "bg-slate-500",
    },
    {
      unitType: "Business",
      total: 20,
      occupied: 18,
      availableToday: 1,
      color: "bg-slate-600",
    },
    {
      unitType: "First-Class",
      total: 10,
      occupied: 8,
      availableToday: 2,
      color: "bg-slate-700",
    },
    {
      unitType: "Capsules",
      total: 50,
      occupied: 42,
      availableToday: 8,
      color: "bg-slate-300",
    },
  ];

  // Mock booking metrics data
  const bookingMetrics: BookingMetrics = {
    newCustomersToday: 12,
    checkInsToday: 8,
    bookingsTrend: 15.3, // positive trend
    monthlyRecurringRevenue: 142500,
    paymentSuccessRate: 96.8,
    outstandingPayments: 3200,
    averageStayDuration: 4.2, // months
  };


  // Mock guest satisfaction data
  const guestSatisfaction: GuestSatisfaction = {
    averageRating: 4.7,
    totalReviews: 184,
    recentReviews: [
      {
        id: "1",
        guestName: "Alice Thompson",
        rating: 5,
        comment: "Perfect for my 3-month work assignment. Clean, quiet, and everything I needed.",
        date: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unit: "A205",
      },
      {
        id: "2",
        guestName: "Bob Martin",
        rating: 5,
        comment: "Excellent for extended stay. Great location and amenities.",
        date: new Date(Date.now() - 5 * 60 * 60 * 1000),
        unit: "B142",
      },
      {
        id: "3",
        guestName: "Carol Davis",
        rating: 4,
        comment: "Very comfortable for my 6-month stay. Professional environment.",
        date: new Date(Date.now() - 8 * 60 * 60 * 1000),
        unit: "C068",
      },
    ],
    ratingDistribution: {
      5: 98,
      4: 56,
      3: 22,
      2: 6,
      1: 2,
    },
  };

  // Mock rating trend data (last 6 months)
  const ratingTrend = [4.2, 4.3, 4.5, 4.6, 4.7, 4.7];


  const getScheduleIcon = (type: string) => {
    switch (type) {
      case "contractor":
        return WrenchIcon;
      case "delivery":
        return PackageIcon;
      case "inspection":
        return CheckSquareIcon;
      case "maintenance":
        return WrenchIcon;
      case "guest_issue":
        return MessageCircleIcon;
      case "housekeeping_check":
        return UserCheckIcon;
      default:
        return CalendarIcon;
    }
  };

  const getScheduleColor = (type: string, priority?: string) => {
    if (priority === "urgent") return "text-red-600";
    if (priority === "high") return "text-orange-600";
    switch (type) {
      case "contractor":
        return "text-blue-600";
      case "delivery":
        return "text-green-600";
      case "inspection":
        return "text-purple-600";
      case "maintenance":
        return "text-yellow-600";
      case "guest_issue":
        return "text-indigo-600";
      case "housekeeping_check":
        return "text-pink-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "badge-success";
      case "confirmed":
        return "badge-info";
      case "pending":
        return "badge-warning";
      default:
        return "badge-ghost";
    }
  };


  return (
    <div className="flex h-full flex-col bg-base-100 p-4">
      {/* Main Dashboard Content - 2 Column Layout */}
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Main Column - Left Side */}
        <div className="space-y-4 lg:col-span-3">
          {/* Priority Messages */}
          <div className="card bg-base-100 shadow">
            <div className="card-body p-3">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold">Priority Messages</h2>
                <div className="flex items-center gap-2">
                  <div className="badge badge-xs badge-warning">
                    {urgentMessages.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      className="btn btn-ghost btn-xs"
                      title="Reply to all urgent"
                    >
                      <ReplyIcon className="h-3 w-3" />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      title="View all messages"
                    >
                      <ExternalLinkIcon className="h-3 w-3" />
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      title="Send broadcast message"
                    >
                      <MailIcon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {urgentMessages.slice(0, 3).map((message) => (
                  <div
                    key={message.id}
                    className="hover:bg-base-50 flex items-center gap-3 rounded border border-base-300 p-2"
                  >
                    <div className="flex-shrink-0">
                      <AlertCircleIcon
                        className={classNames(
                          "h-4 w-4",
                          message.priority === "urgent"
                            ? "text-red-600"
                            : "text-orange-600",
                        )}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium">
                          {message.sender}
                        </span>
                        {message.apartment && (
                          <span className="rounded bg-base-200 px-1.5 py-0.5 text-xs text-base-content/70">
                            {message.apartment}
                          </span>
                        )}
                        <span
                          className={classNames(
                            "badge badge-xs",
                            message.priority === "urgent"
                              ? "badge-error"
                              : "badge-warning",
                          )}
                        >
                          {message.priority}
                        </span>
                        <span className="text-xs text-base-content/60">
                          {format(message.timestamp, "HH:mm")}
                        </span>
                        <span className="rounded bg-base-200 px-1.5 py-0.5 text-xs text-base-content/60">
                          {message.source}
                        </span>
                        <span className="text-xs text-base-content/60">
                          {message.category}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-xs text-base-content/90">
                        {message.subject}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <button className="btn btn-ghost btn-xs" title="Reply">
                        <ReplyIcon className="h-3 w-3" />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        title="Chat with guest"
                      >
                        <MessageCircleIcon className="h-3 w-3" />
                      </button>
                      <button
                        className="btn btn-ghost btn-xs"
                        title="Create task"
                      >
                        <CheckSquareIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
                {urgentMessages.length > 3 && (
                  <div className="flex items-center justify-center rounded bg-base-200 p-2 text-xs text-base-content/60">
                    +{urgentMessages.length - 3} more urgent messages
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="card bg-base-100 shadow">
            <div className="card-body p-3">
              <h2 className="mb-3 text-base font-semibold">Today's Schedule</h2>

              {/* Calendar View */}
              <div className="mb-4 overflow-x-auto">
                <div
                  className="grid gap-1 text-xs"
                  style={{ gridTemplateColumns: "auto 1fr 1fr 1fr" }}
                >
                  {/* Days header */}
                  {[
                    "Time",
                    "Today",
                    "Tomorrow",
                    format(
                      new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                      "MMM d",
                    ),
                  ].map((day, index) => (
                    <div
                      key={day}
                      className={classNames(
                        "border-b border-base-300 p-1 text-center font-medium",
                        index === 1 ? "text-primary" : "text-base-content/70",
                      )}
                    >
                      {day}
                    </div>
                  ))}

                  {/* Time slots */}
                  {Array.from({ length: 10 }, (_, hour) => {
                    const timeSlot = `${9 + hour}:00`;
                    return (
                      <div key={timeSlot} className="contents">
                        <div className="border-r border-base-300 p-1 pr-2 text-right text-xs text-base-content/60">
                          {timeSlot}
                        </div>
                        {Array.from({ length: 3 }, (_, day) => {
                          // Find tasks for this hour slot (including :30 times)
                          const tasks = allSchedule.filter((t) => {
                            const taskHour = parseInt(t.time.split(":")[0]);
                            const slotHour = 9 + hour;
                            return t.day === day && taskHour === slotHour;
                          });

                          return (
                            <div
                              key={`${timeSlot}-${day}`}
                              className="relative h-8 border-r border-base-300"
                            >
                              {tasks.map((task, index) => (
                                <div
                                  key={task.id}
                                  className={classNames(
                                    "absolute inset-0 truncate rounded border px-1 py-0.5 text-xs backdrop-blur-sm",
                                    task.priority === "urgent"
                                      ? "border-error bg-error/40 text-base-content"
                                      : task.priority === "high"
                                        ? "border-warning bg-warning/40 text-base-content"
                                        : task.type === "contractor"
                                          ? "border-info bg-info/40 text-base-content"
                                          : task.type === "delivery"
                                            ? "border-success bg-success/40 text-base-content"
                                            : task.type === "inspection"
                                              ? "border-neutral bg-neutral/40 text-base-content"
                                              : task.type === "maintenance"
                                                ? "border-warning bg-warning/40 text-base-content"
                                                : task.type === "guest_issue"
                                                  ? "border-accent bg-accent/40 text-base-content"
                                                  : task.type ===
                                                      "housekeeping_check"
                                                    ? "border-info bg-info/40 text-base-content"
                                                    : "border-primary bg-primary/40 text-base-content",
                                  )}
                                  style={{
                                    top: `${index * 50}%`,
                                    height: tasks.length > 1 ? "50%" : "100%",
                                  }}
                                  title={`${task.time} - ${task.title} (${task.description})`}
                                >
                                  {task.time.includes(":30") ? "●" : ""}{" "}
                                  {task.title}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Schedule List */}
              <div className="space-y-2">
                {todaySchedule.map((item) => {
                  const IconComponent = getScheduleIcon(item.type);
                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-2 rounded border border-base-300 p-2"
                    >
                      <div className="flex-shrink-0">
                        <IconComponent
                          className={classNames(
                            "h-4 w-4",
                            getScheduleColor(item.type, item.priority),
                          )}
                        />
                      </div>
                      <div className="w-12 font-mono text-xs text-base-content/70">
                        {item.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{item.title}</p>
                        <p className="text-xs text-base-content/70">
                          {item.unit && `${item.unit} • `}
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.priority && (
                          <span
                            className={classNames(
                              "badge badge-xs",
                              item.priority === "urgent"
                                ? "badge-error"
                                : item.priority === "high"
                                  ? "badge-warning"
                                  : "badge-ghost",
                            )}
                          >
                            {item.priority}
                          </span>
                        )}
                        <span
                          className={classNames(
                            "badge badge-xs",
                            getStatusBadge(item.status || "pending"),
                          )}
                        >
                          {item.status || "pending"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column - Right Side */}
        <div className="space-y-4 lg:col-span-1">
          {/* Booking Metrics */}
          <div className="card bg-base-100 shadow">
            <div className="card-body p-3">
              <h2 className="mb-3 text-base font-semibold">Booking Metrics</h2>
              <div className="space-y-3">
                {/* New Customers Today */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheckIcon className="h-4 w-4" />
                    <span className="text-sm">New Customers</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {bookingMetrics.newCustomersToday}
                    </div>
                    <div className="text-xs text-base-content/70">today</div>
                  </div>
                </div>

                {/* Check-ins Today */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-sm">Check-ins</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {bookingMetrics.checkInsToday}
                    </div>
                    <div className="text-xs text-base-content/70">today</div>
                  </div>
                </div>

                {/* Booking Trend */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="h-4 w-4" />
                    <span className="text-sm">Booking Trend</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                      <TrendingUpIcon className="h-3 w-3" />
                      +{bookingMetrics.bookingsTrend}%
                    </div>
                    <div className="text-xs text-base-content/70">vs last month</div>
                  </div>
                </div>

                {/* Monthly Recurring Revenue */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="h-4 w-4" />
                    <span className="text-sm">Monthly Revenue</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      €{bookingMetrics.monthlyRecurringRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-base-content/70">recurring</div>
                  </div>
                </div>

                {/* Payment Success Rate */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckSquareIcon className="h-4 w-4" />
                    <span className="text-sm">Payment Success</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">
                      {bookingMetrics.paymentSuccessRate}%
                    </div>
                    <div className="text-xs text-base-content/70">success rate</div>
                  </div>
                </div>

                {/* Outstanding Payments */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircleIcon className="h-4 w-4" />
                    <span className="text-sm">Outstanding</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">
                      €{bookingMetrics.outstandingPayments.toLocaleString()}
                    </div>
                    <div className="text-xs text-base-content/70">overdue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Occupancy Overview */}
          <div className="card bg-base-100 shadow">
            <div className="card-body p-3">
              <h2 className="mb-3 text-base font-semibold">Occupancy</h2>
              <div className="space-y-3">
                {occupancyData.map((data) => {
                  const occupancyPercent = Math.round(
                    (data.occupied / data.total) * 100,
                  );
                  return (
                    <div key={data.unitType} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={classNames(
                              "h-3 w-3 rounded",
                              data.color,
                            )}
                          />
                          <span className="text-sm font-medium">
                            {data.unitType}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {occupancyPercent}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-base-200">
                        <div
                          className={classNames("h-2 rounded-full", data.color)}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-base-content/70">
                        <span>
                          {data.occupied}/{data.total}
                        </span>
                        <span>{data.availableToday} avail</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Guest Ratings */}
          <div className="card bg-base-100 shadow">
            <div className="card-body p-3">
              <h2 className="mb-3 text-base font-semibold">Guest Ratings</h2>
              <div className="space-y-3">
                {/* Compact Rating Overview */}
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-2">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <div>
                      <div className="text-lg font-bold text-green-700">
                        {guestSatisfaction.averageRating.toFixed(1)}
                      </div>
                      <div className="text-xs text-base-content/70">
                        {guestSatisfaction.totalReviews} reviews
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                      <TrendingUpIcon className="h-3 w-3" />
                      +0.5 trend
                    </div>
                    <div className="text-xs text-base-content/70">vs last month</div>
                  </div>
                </div>

                {/* Rating Trend Chart */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-base-content/80">
                    6-Month Rating Trend
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {ratingTrend.map((rating, index) => {
                      const height = ((rating - 4) / 1) * 100; // Scale 4-5 to 0-100%
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full bg-green-500 rounded-t"
                            style={{ height: `${height}%` }}
                            title={`Month ${index + 1}: ${rating.toFixed(1)}`}
                          />
                          <div className="text-xs text-base-content/60">
                            {rating.toFixed(1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Distribution - Compact */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-base-content/80">
                    Rating Breakdown
                  </div>
                  {Object.entries(guestSatisfaction.ratingDistribution)
                    .reverse()
                    .map(([rating, count]) => {
                      const percentage = (count / guestSatisfaction.totalReviews) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="flex w-8 items-center gap-1">
                            <span className="text-xs font-medium">{rating}</span>
                            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                          <div className="h-2 flex-1 rounded-full bg-base-200">
                            <div
                              className="h-2 rounded-full bg-base-content/20"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="flex items-center gap-1 min-w-0">
                            <span className="text-xs font-medium">{count}</span>
                            <span className="text-xs text-base-content/70">({percentage.toFixed(0)}%)</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Recent Reviews - Compact */}
                <div className="space-y-1">
                  <div className="text-sm font-medium text-base-content/80">
                    Recent Reviews
                  </div>
                  {guestSatisfaction.recentReviews.slice(0, 2).map((review) => (
                    <div
                      key={review.id}
                      className="rounded border border-base-300 p-2"
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">
                            {review.guestName}
                          </span>
                          <span className="rounded bg-base-200 px-1.5 py-0.5 text-xs text-base-content/70">
                            {review.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-xs text-base-content/80">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
