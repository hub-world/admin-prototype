import classnames from "classnames";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  ArchiveIcon,
  ChevronDownIcon,
  ClockIcon,
  GlobeIcon,
  ListFilterIcon,
  MailIcon,
  MessageCircleIcon,
  ReplyIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
} from "lucide-react";
import React, { useState } from "react";

interface Message {
  id: string;
  subject: string;
  content: string;
  sender: string;
  senderEmail: string;
  source: "app" | "email" | "booking.com" | "airbnb" | "expedia";
  timestamp: Date;
  read: boolean;
  priority: "high" | "medium" | "low";
  category: "inquiry" | "booking" | "complaint" | "support" | "cancellation";
  apartmentNumber?: string;
  reservationId?: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    subject: "Desk lamp not working - Unit 204",
    content:
      "Hi! The desk lamp in apartment 204 isn't working. I tried changing the bulb but it still won't turn on. Could you please take a look? I'm working late hours and need proper lighting for my workspace.",
    sender: "Alex Chen",
    senderEmail: "alex.chen@techstartup.com",
    source: "app",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    priority: "high",
    category: "support",
    apartmentNumber: "204",
    reservationId: "RES-2024-001",
  },
  {
    id: "2",
    subject: "Booking inquiry for next weekend",
    content:
      "Hello, I'm interested in booking a 1-bedroom apartment for next weekend (Jan 20-22). Do you have availability? I'm a freelance designer looking for a quiet space to work. Please let me know rates and availability for a short-term stay.",
    sender: "Maya Rodriguez",
    senderEmail: "maya.design@gmail.com",
    source: "email",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: "medium",
    category: "inquiry",
  },
  {
    id: "3",
    subject: "Booking Extension Request",
    content:
      "Guest wants to extend their stay by 1 week. Current booking: Jan 15-17, wants to extend to Jan 24. Guest mentioned they're a remote worker and loves the apartment setup. Please confirm availability and pricing.",
    sender: "Booking.com Support",
    senderEmail: "noreply@booking.com",
    source: "booking.com",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    read: true,
    priority: "medium",
    category: "booking",
    reservationId: "BKG-BC-7829",
  },
  {
    id: "4",
    subject: "Cancellation Request - Project Cancelled",
    content:
      "Hi, I need to cancel my booking for February 5-8 as my client project got cancelled unexpectedly. I understand this is short notice, but I hope you can provide a refund given the circumstances. Booking reference: AIR-2024-445.",
    sender: "Jordan Taylor",
    senderEmail: "jordan.taylor@freelancer.com",
    source: "airbnb",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: true,
    priority: "medium",
    category: "cancellation",
    reservationId: "AIR-2024-445",
  },
  {
    id: "5",
    subject: "Kitchen drawer handle loose",
    content:
      "Hi! Just wanted to let you know that the handle on the top kitchen drawer in apartment 205 is a bit loose. It's not urgent, but thought you'd want to know for the next maintenance check. Everything else is perfect!",
    sender: "Sam Wilson",
    senderEmail: "sam.wilson@nomadcoder.com",
    source: "email",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: false,
    priority: "high",
    category: "complaint",
    apartmentNumber: "205",
  },
  {
    id: "6",
    subject: "Perfect digital nomad setup!",
    content:
      "Just wanted to say thank you for the amazing stay! The apartment was spotless, the high-speed internet was perfect for my work, and the co-working space nearby was a great bonus. The desk setup was exactly what I needed. Will definitely be back on my next project!",
    sender: "Emma Thompson",
    senderEmail: "emma.thompson@digitaldesign.com",
    source: "app",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    read: true,
    priority: "low",
    category: "support",
  },
  {
    id: "7",
    subject: "Guest Review Response Required",
    content:
      "A guest has left a review mentioning a cabinet door that wouldn't close properly during their stay. Please review and respond within 48 hours to maintain your property rating.",
    sender: "Expedia Partner Central",
    senderEmail: "partners@expedia.com",
    source: "expedia",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    read: false,
    priority: "medium",
    category: "support",
  },
  {
    id: "8",
    subject: "Early check-in request",
    content:
      "Hi! My flight arrives at 10 AM tomorrow and I have a client call at 2 PM. Would early check-in be possible? I need to set up my workspace and test the internet connection. Happy to pay any additional fees. Thanks!",
    sender: "David Park",
    senderEmail: "david.park@consultant.com",
    source: "app",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    priority: "low",
    category: "inquiry",
    reservationId: "RES-2024-012",
  },
];

const sourceConfig = {
  app: { icon: MessageCircleIcon, label: "Mobile App", color: "text-blue-600" },
  email: { icon: MailIcon, label: "Email", color: "text-green-600" },
  "booking.com": {
    icon: GlobeIcon,
    label: "Booking.com",
    color: "text-orange-600",
  },
  airbnb: { icon: GlobeIcon, label: "Airbnb", color: "text-pink-600" },
  expedia: { icon: GlobeIcon, label: "Expedia", color: "text-purple-600" },
};

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredMessages = sampleMessages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSource =
      filterSource === "all" || message.source === filterSource;
    const matchesPriority =
      filterPriority === "all" || message.priority === filterPriority;
    const matchesRead = !showUnreadOnly || !message.read;

    return matchesSearch && matchesSource && matchesPriority && matchesRead;
  });

  const unreadCount = sampleMessages.filter((m) => !m.read).length;

  return (
    <div className="flex h-full bg-base-100">
      {/* Messages List */}
      <div className="flex w-96 flex-col border-r border-base-300">
        {/* Header */}
        <div className="border-b border-base-300 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Messages</h1>
            <div className="badge badge-primary">{unreadCount} unread</div>
          </div>

          {/* Search and Filters */}
          <div className="mb-3 flex gap-2">
            <label className="input-bordered input flex flex-1 items-center gap-2">
              <SearchIcon className="h-4 w-4 text-base-content/50" />
              <input
                type="text"
                placeholder="Search messages..."
                className="grow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn border-base-content/20 btn-ghost"
              >
                <ListFilterIcon className="h-4 w-4" />
                <ChevronDownIcon className="h-3 w-3" />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content menu z-[1] w-64 rounded-box bg-base-100 p-2 shadow"
              >
                <div className="p-2">
                  <div className="mb-3">
                    <label className="label">
                      <span className="label-text text-sm font-medium">
                        Source
                      </span>
                    </label>
                    <select
                      className="select-bordered select w-full select-sm"
                      value={filterSource}
                      onChange={(e) => setFilterSource(e.target.value)}
                    >
                      <option value="all">All Sources</option>
                      <option value="app">Mobile App</option>
                      <option value="email">Email</option>
                      <option value="booking.com">Booking.com</option>
                      <option value="airbnb">Airbnb</option>
                      <option value="expedia">Expedia</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="label">
                      <span className="label-text text-sm font-medium">
                        Priority
                      </span>
                    </label>
                    <select
                      className="select-bordered select w-full select-sm"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="all">All Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
            />
            <span className="label-text text-sm">Show unread only</span>
          </label>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => {
            const SourceIcon = sourceConfig[message.source].icon;
            return (
              <div
                key={message.id}
                className={classnames(
                  "cursor-pointer border-b border-base-300 p-4 transition-colors hover:bg-base-200",
                  {
                    "bg-base-200": selectedMessage?.id === message.id,
                    "bg-base-100":
                      !message.read && selectedMessage?.id !== message.id,
                  },
                )}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <SourceIcon
                      className={classnames(
                        "h-4 w-4",
                        sourceConfig[message.source].color,
                      )}
                    />
                    <span className="text-sm text-base-content/70">
                      {sourceConfig[message.source].label}
                    </span>
                    {message.priority === "high" && (
                      <AlertCircleIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {!message.read && (
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    )}
                    <span className="text-xs text-base-content/50">
                      {format(message.timestamp, "HH:mm")}
                    </span>
                  </div>
                </div>

                <div className="mb-1">
                  <span className="text-sm font-medium">{message.sender}</span>
                  {message.apartmentNumber && (
                    <span className="ml-2 text-xs text-base-content/70">
                      Apt {message.apartmentNumber}
                    </span>
                  )}
                </div>

                <div className="mb-1 line-clamp-1 text-sm font-medium">
                  {message.subject}
                </div>

                <div className="line-clamp-2 text-xs text-base-content/70">
                  {message.content}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={classnames("badge badge-xs", {
                      "badge-error": message.category === "complaint",
                      "badge-warning": message.category === "cancellation",
                      "badge-info": message.category === "inquiry",
                      "badge-success": message.category === "booking",
                      "badge-ghost": message.category === "support",
                    })}
                  >
                    {message.category}
                  </span>
                  {message.reservationId && (
                    <span className="text-xs text-base-content/50">
                      {message.reservationId}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Detail */}
      <div className="flex flex-1 flex-col">
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className="border-b border-base-300 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar avatar-placeholder">
                    <div className="w-8 rounded-full bg-primary text-primary-content">
                      <span className="text-sm font-medium">
                        {selectedMessage.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{selectedMessage.sender}</div>
                    <div className="text-sm text-base-content/70">
                      {selectedMessage.senderEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost btn-sm">
                    <ReplyIcon className="h-4 w-4" />
                    Reply
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <StarIcon className="h-4 w-4" />
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <ArchiveIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h2 className="mb-2 text-xl font-semibold">
                {selectedMessage.subject}
              </h2>

              <div className="flex items-center gap-4 text-sm text-base-content/70">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {format(selectedMessage.timestamp, "MMM d, yyyy HH:mm")}
                </div>
                <div className="flex items-center gap-1">
                  {React.createElement(
                    sourceConfig[selectedMessage.source].icon,
                    {
                      className: classnames(
                        "h-4 w-4",
                        sourceConfig[selectedMessage.source].color,
                      ),
                    },
                  )}
                  {sourceConfig[selectedMessage.source].label}
                </div>
                {selectedMessage.apartmentNumber && (
                  <div>Apt {selectedMessage.apartmentNumber}</div>
                )}
                {selectedMessage.reservationId && (
                  <div>{selectedMessage.reservationId}</div>
                )}
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6">
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
            </div>

            {/* Reply Section */}
            <div className="border-t border-base-300 p-6">
              <div className="mb-4 flex items-center gap-2">
                <ReplyIcon className="h-4 w-4" />
                <span className="font-medium">
                  Reply to {selectedMessage.sender}
                </span>
              </div>

              <textarea
                className="textarea-bordered textarea mb-4 h-32 w-full"
                placeholder="Type your reply..."
              ></textarea>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost btn-sm">
                    <span>📎</span>
                    Attach
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <SparklesIcon className="h-4 w-4" />
                    AI Draft
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost btn-sm">Save Draft</button>
                  <button className="btn btn-sm btn-primary">Send Reply</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <MessageCircleIcon className="mx-auto mb-4 h-16 w-16 text-base-content/30" />
              <h3 className="mb-2 text-lg font-medium text-base-content/70">
                Select a message to view
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
