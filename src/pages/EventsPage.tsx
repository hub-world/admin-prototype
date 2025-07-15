import classNames from "classnames";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PlusIcon,
  RepeatIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number; // in hours
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  organizer: string;
  status: "draft" | "published" | "cancelled";
  category: "social" | "educational" | "wellness" | "business";
  recurrence: "none" | "weekly" | "monthly" | "quarterly";
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Welcome Coffee Morning",
    description: "Meet your neighbors and get to know the community",
    date: new Date("2024-01-20"),
    time: "10:00",
    duration: 1.5,
    location: "Community Lounge",
    maxAttendees: 20,
    currentAttendees: 8,
    organizer: "Sarah Johnson",
    status: "published",
    category: "social",
    recurrence: "weekly",
  },
  {
    id: "2",
    title: "Professional Networking Event",
    description: "Connect with other professionals in the building",
    date: new Date("2024-01-25"),
    time: "18:30",
    duration: 2,
    location: "Rooftop Terrace",
    maxAttendees: 30,
    currentAttendees: 15,
    organizer: "Urban Hub Management",
    status: "published",
    category: "business",
    recurrence: "none",
  },
  {
    id: "3",
    title: "Yoga & Mindfulness Session",
    description: "Start your weekend with relaxation and wellness",
    date: new Date("2024-01-27"),
    time: "09:00",
    duration: 1,
    location: "Fitness Studio",
    maxAttendees: 12,
    currentAttendees: 5,
    organizer: "Lisa Chen",
    status: "published",
    category: "wellness",
    recurrence: "weekly",
  },
  {
    id: "4",
    title: "Resident Game Night",
    description: "Board games, card games, and fun competitions with neighbors",
    date: new Date("2024-02-01"),
    time: "19:00",
    duration: 2.5,
    location: "Community Lounge",
    maxAttendees: 16,
    currentAttendees: 4,
    organizer: "Alex Martinez",
    status: "published",
    category: "social",
    recurrence: "weekly",
  },
  {
    id: "5",
    title: "Building Welcome Presentation",
    description: "Orientation session for new residents about building amenities and policies",
    date: new Date("2024-02-03"),
    time: "11:00",
    duration: 0.5,
    location: "Conference Room",
    maxAttendees: 25,
    currentAttendees: 12,
    organizer: "Urban Hub Management",
    status: "published",
    category: "educational",
    recurrence: "none",
  },
  {
    id: "6",
    title: "Monthly Community Mixer",
    description: "Monthly social gathering with drinks and appetizers",
    date: new Date("2024-02-05"),
    time: "17:00",
    duration: 2,
    location: "Rooftop Terrace",
    maxAttendees: 40,
    currentAttendees: 8,
    organizer: "Sarah Johnson",
    status: "published",
    category: "social",
    recurrence: "monthly",
  },
];

export function EventsPage() {
  const [events] = useState<Event[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" || event.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: Event["status"]) => {
    const baseClasses = "badge badge-sm";
    switch (status) {
      case "published":
        return classNames(baseClasses, "badge-success");
      case "draft":
        return classNames(baseClasses, "badge-warning");
      case "cancelled":
        return classNames(baseClasses, "badge-error");
      default:
        return baseClasses;
    }
  };

  const getCategoryBadge = (category: Event["category"]) => {
    const baseClasses = "badge badge-sm badge-outline";
    switch (category) {
      case "social":
        return classNames(baseClasses, "badge-info");
      case "educational":
        return classNames(baseClasses, "badge-primary");
      case "wellness":
        return classNames(baseClasses, "badge-success");
      case "business":
        return classNames(baseClasses, "badge-secondary");
      default:
        return baseClasses;
    }
  };

  const getRecurrenceText = (recurrence: Event["recurrence"]) => {
    switch (recurrence) {
      case "weekly":
        return "Weekly";
      case "monthly":
        return "Monthly";
      case "quarterly":
        return "Quarterly";
      case "none":
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-content">Events</h1>
            <p className="text-base-content/70">
              Manage community events and activities
            </p>
          </div>
          <button className="btn btn-primary">
            <PlusIcon className="h-4 w-4" />
            Create Event
          </button>
        </div>

        <div className="card mb-6 bg-base-200 shadow-sm">
          <div className="card-body">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-64">
                <label className="input input-bordered flex items-center gap-2">
                  <SearchIcon className="h-4 w-4 opacity-70" />
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
              </div>

              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="social">Social</option>
                <option value="educational">Educational</option>
                <option value="wellness">Wellness</option>
                <option value="business">Business</option>
              </select>

              <select
                className="select select-bordered w-full max-w-xs"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <h3 className="card-title text-lg">{event.title}</h3>
                  <div className="flex gap-2">
                    <span className={getStatusBadge(event.status)}>
                      {event.status}
                    </span>
                    <span className={getCategoryBadge(event.category)}>
                      {event.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-base-content/70 mb-4">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-base-content/60" />
                    <span>{format(event.date, "MMM d, yyyy")}</span>
                    {getRecurrenceText(event.recurrence) && (
                      <span className="flex items-center gap-1 text-xs text-base-content/50">
                        <RepeatIcon className="h-3 w-3" />
                        {getRecurrenceText(event.recurrence)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ClockIcon className="h-4 w-4 text-base-content/60" />
                    <span>{event.time} ({event.duration}h)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="h-4 w-4 text-base-content/60" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <UsersIcon className="h-4 w-4 text-base-content/60" />
                    <span>
                      {event.currentAttendees} / {event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-3">
                    <span className="text-sm text-base-content/60">
                      Organizer: {event.organizer}
                    </span>
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-sm btn-outline">Edit</button>
                    <button className="btn btn-sm btn-primary">View</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-base-content/40" />
              <h3 className="mt-2 text-sm font-medium text-base-content">
                No events found
              </h3>
              <p className="mt-1 text-sm text-base-content/60">
                Try adjusting your search criteria or create a new event.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}