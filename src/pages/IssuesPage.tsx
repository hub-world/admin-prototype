import classNames from "classnames";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  EditIcon,
  HardHatIcon,
  ImageIcon,
  type LucideIcon,
  MessageSquareIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon,
  UserIcon,
  WrenchIcon,
} from "lucide-react";
import { useState } from "react";

type AssignmentType = "internal" | "contractor" | "unassigned";

type Issue = {
  id: string;
  referenceNumber: string;
  title: string;
  description: string;
  category: string;
  issueType: string;
  status: "open" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  customerName: string;
  apartment: string;
  photoCount: number;
  createdAt: Date;
  updatedAt: Date;
  appointmentDate?: Date;
  appointmentTime?: string;
  assignmentType: AssignmentType;
  assignedTo?: string;
  assignedStaffId?: string;
  assignedContractorId?: string;
  estimatedCost?: number;
  autoScheduled?: boolean;
};

type IssueStatus = "open" | "resolved" | "closed";
type IssuePriority = "low" | "medium" | "high" | "urgent";

type ContractorIssue = {
  id: string;
  referenceNumber: string;
  apartment: string;
  issueType: string;
  date: Date;
  time: string;
  status: "scheduled" | "in_progress" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
};

type CapabilityRanking = {
  capability: string;
  rank: number; // 1-5 ranking within this capability
};

type Contractor = {
  id: string;
  company: string;
  capabilityRankings: CapabilityRanking[];
  rating: number;
  phone: string;
  email: string;
  available: boolean;
  scheduledIssues: ContractorIssue[];
};

const mockContractors: Contractor[] = [
  {
    id: "contractor1",
    company: "Johnson Plumbing Solutions",
    capabilityRankings: [
      { capability: "plumbing", rank: 5 },
      { capability: "heating", rank: 4 },
    ],
    rating: 4.8,
    phone: "+1 (555) 123-4567",
    email: "mike@johnsonplumbing.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue1",
        referenceNumber: "RP-123456",
        apartment: "P045",
        issueType: "plumbing",
        date: new Date("2024-01-12T14:00:00"),
        time: "2:00 PM - 4:00 PM",
        status: "scheduled",
        priority: "high",
      },
      {
        id: "issue2",
        referenceNumber: "RP-789012",
        apartment: "B007",
        issueType: "heating",
        date: new Date("2024-01-13T10:00:00"),
        time: "10:00 AM - 12:00 PM",
        status: "scheduled",
        priority: "medium",
      },
    ],
  },
  {
    id: "contractor2",
    company: "Elite Electrical Services",
    capabilityRankings: [
      { capability: "electrical", rank: 5 },
      { capability: "lighting", rank: 4 },
    ],
    rating: 4.9,
    phone: "+1 (555) 234-5678",
    email: "sarah@eliteelectrical.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue3",
        referenceNumber: "RP-345678",
        apartment: "C023",
        issueType: "electrical",
        date: new Date("2024-01-13T09:00:00"),
        time: "9:00 AM - 11:00 AM",
        status: "scheduled",
        priority: "urgent",
      },
    ],
  },
  {
    id: "contractor3",
    company: "Davis HVAC & Appliances",
    capabilityRankings: [
      { capability: "heating", rank: 5 },
      { capability: "appliance", rank: 3 },
    ],
    rating: 4.7,
    phone: "+1 (555) 345-6789",
    email: "robert@davishvac.com",
    available: false,
    scheduledIssues: [
      {
        id: "issue4",
        referenceNumber: "RP-901234",
        apartment: "B007",
        issueType: "heating",
        date: new Date("2024-01-11T10:00:00"),
        time: "10:00 AM - 12:00 PM",
        status: "in_progress",
        priority: "urgent",
      },
    ],
  },
  {
    id: "contractor4",
    company: "Brown General Contracting",
    capabilityRankings: [
      { capability: "window", rank: 4 },
      { capability: "door", rank: 3 },
      { capability: "maintenance", rank: 2 },
    ],
    rating: 4.6,
    phone: "+1 (555) 456-7890",
    email: "emily@browncontracting.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue5",
        referenceNumber: "RP-567890",
        apartment: "F003",
        issueType: "window",
        date: new Date("2024-01-11T16:00:00"),
        time: "4:00 PM - 6:00 PM",
        status: "scheduled",
        priority: "medium",
      },
      {
        id: "issue6",
        referenceNumber: "RP-111222",
        apartment: "E012",
        issueType: "maintenance",
        date: new Date("2024-01-12T09:00:00"),
        time: "9:00 AM - 11:00 AM",
        status: "scheduled",
        priority: "low",
      },
    ],
  },
  {
    id: "contractor5",
    company: "Premium Plumbing Co",
    capabilityRankings: [
      { capability: "plumbing", rank: 4 },
      { capability: "appliance", rank: 2 },
    ],
    rating: 4.5,
    phone: "+1 (555) 567-8901",
    email: "info@premiumplumbing.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue7",
        referenceNumber: "RP-222333",
        apartment: "A015",
        issueType: "plumbing",
        date: new Date("2024-01-14T13:00:00"),
        time: "1:00 PM - 3:00 PM",
        status: "scheduled",
        priority: "medium",
      },
    ],
  },
  {
    id: "contractor6",
    company: "Bright Lighting Solutions",
    capabilityRankings: [
      { capability: "lighting", rank: 5 },
      { capability: "electrical", rank: 3 },
    ],
    rating: 4.4,
    phone: "+1 (555) 678-9012",
    email: "contact@brightlighting.com",
    available: true,
    scheduledIssues: [],
  },
  {
    id: "contractor7",
    company: "Quick Fix Appliances",
    capabilityRankings: [
      { capability: "appliance", rank: 5 },
      { capability: "heating", rank: 2 },
    ],
    rating: 4.3,
    phone: "+1 (555) 789-0123",
    email: "service@quickfixappliances.com",
    available: false,
    scheduledIssues: [
      {
        id: "issue8",
        referenceNumber: "RP-333444",
        apartment: "D021",
        issueType: "appliance",
        date: new Date("2024-01-15T11:00:00"),
        time: "11:00 AM - 1:00 PM",
        status: "in_progress",
        priority: "high",
      },
    ],
  },
  {
    id: "contractor8",
    company: "Secure Windows & Doors",
    capabilityRankings: [
      { capability: "window", rank: 5 },
      { capability: "door", rank: 5 },
    ],
    rating: 4.7,
    phone: "+1 (555) 890-1234",
    email: "hello@securewindows.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue9",
        referenceNumber: "RP-444555",
        apartment: "B033",
        issueType: "window",
        date: new Date("2024-01-16T08:00:00"),
        time: "8:00 AM - 10:00 AM",
        status: "scheduled",
        priority: "medium",
      },
      {
        id: "issue10",
        referenceNumber: "RP-555666",
        apartment: "C012",
        issueType: "door",
        date: new Date("2024-01-17T14:00:00"),
        time: "2:00 PM - 4:00 PM",
        status: "scheduled",
        priority: "low",
      },
    ],
  },
  {
    id: "contractor9",
    company: "Total Maintenance Services",
    capabilityRankings: [
      { capability: "maintenance", rank: 5 },
      { capability: "lighting", rank: 3 },
      { capability: "plumbing", rank: 2 },
    ],
    rating: 4.2,
    phone: "+1 (555) 901-2345",
    email: "support@totalmaintenance.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue11",
        referenceNumber: "RP-666777",
        apartment: "E067",
        issueType: "maintenance",
        date: new Date("2024-01-18T15:00:00"),
        time: "3:00 PM - 5:00 PM",
        status: "scheduled",
        priority: "low",
      },
    ],
  },
  {
    id: "contractor10",
    company: "Expert Electrical Works",
    capabilityRankings: [
      { capability: "electrical", rank: 4 },
      { capability: "lighting", rank: 2 },
    ],
    rating: 4.6,
    phone: "+1 (555) 012-3456",
    email: "info@expertelectrical.com",
    available: true,
    scheduledIssues: [],
  },
  {
    id: "contractor11",
    company: "Climate Control Specialists",
    capabilityRankings: [
      { capability: "heating", rank: 3 },
      { capability: "appliance", rank: 4 },
    ],
    rating: 4.5,
    phone: "+1 (555) 123-4567",
    email: "service@climatecontrol.com",
    available: false,
    scheduledIssues: [
      {
        id: "issue12",
        referenceNumber: "RP-777888",
        apartment: "A099",
        issueType: "heating",
        date: new Date("2024-01-19T09:00:00"),
        time: "9:00 AM - 11:00 AM",
        status: "scheduled",
        priority: "urgent",
      },
    ],
  },
  {
    id: "contractor12",
    company: "Pro Window Solutions",
    capabilityRankings: [
      { capability: "window", rank: 3 },
      { capability: "door", rank: 4 },
      { capability: "maintenance", rank: 3 },
    ],
    rating: 4.1,
    phone: "+1 (555) 234-5678",
    email: "contact@prowindows.com",
    available: true,
    scheduledIssues: [],
  },
  {
    id: "contractor13",
    company: "Advanced Plumbing Systems",
    capabilityRankings: [
      { capability: "plumbing", rank: 3 },
      { capability: "heating", rank: 4 },
    ],
    rating: 4.4,
    phone: "+1 (555) 345-6789",
    email: "admin@advancedplumbing.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue13",
        referenceNumber: "RP-888999",
        apartment: "F034",
        issueType: "plumbing",
        date: new Date("2024-01-20T10:00:00"),
        time: "10:00 AM - 12:00 PM",
        status: "scheduled",
        priority: "high",
      },
    ],
  },
  {
    id: "contractor14",
    company: "Elite Door & Window Co",
    capabilityRankings: [
      { capability: "door", rank: 2 },
      { capability: "window", rank: 2 },
      { capability: "maintenance", rank: 4 },
    ],
    rating: 4.0,
    phone: "+1 (555) 456-7890",
    email: "service@elitedoor.com",
    available: true,
    scheduledIssues: [
      {
        id: "issue14",
        referenceNumber: "RP-999000",
        apartment: "D045",
        issueType: "door",
        date: new Date("2024-01-21T13:00:00"),
        time: "1:00 PM - 3:00 PM",
        status: "scheduled",
        priority: "medium",
      },
    ],
  },
];

const mockIssues: Issue[] = [
  {
    id: "1",
    referenceNumber: "RP-123456",
    title: "Plumbing Issue",
    description:
      "Kitchen sink is not draining properly and there's a bad smell coming from it.",
    category: "Kitchen",
    issueType: "plumbing",
    status: "open",
    priority: "high",
    customerName: "Emma Johnson",
    apartment: "P045",
    photoCount: 2,
    createdAt: new Date("2024-01-10T09:30:00"),
    updatedAt: new Date("2024-01-10T09:30:00"),
    appointmentDate: new Date("2024-01-12T14:00:00"),
    appointmentTime: "2:00 PM - 4:00 PM",
    assignmentType: "contractor",
    assignedTo: "Mike Johnson",
    assignedContractorId: "contractor1",
    estimatedCost: 150,
    autoScheduled: true,
  },
  {
    id: "2",
    referenceNumber: "RP-789012",
    title: "Heating/AC Issue",
    description:
      "Heating system is not working in the bedroom. It's very cold at night.",
    category: "Bedroom",
    issueType: "heating",
    status: "open",
    priority: "urgent",
    customerName: "Michael Chen",
    apartment: "B007",
    photoCount: 1,
    createdAt: new Date("2024-01-09T16:20:00"),
    updatedAt: new Date("2024-01-10T11:15:00"),
    appointmentDate: new Date("2024-01-11T10:00:00"),
    appointmentTime: "10:00 AM - 12:00 PM",
    assignmentType: "contractor",
    assignedTo: "Robert Davis",
    assignedContractorId: "contractor3",
    estimatedCost: 275,
    autoScheduled: true,
  },
  {
    id: "3",
    referenceNumber: "RP-345678",
    title: "Shower/Bathtub Issue",
    description: "Water pressure is very low in the shower.",
    category: "Bathroom",
    issueType: "shower",
    status: "resolved",
    priority: "medium",
    customerName: "Sarah Wilson",
    apartment: "E089",
    photoCount: 0,
    createdAt: new Date("2024-01-08T13:45:00"),
    updatedAt: new Date("2024-01-09T15:30:00"),
    appointmentDate: new Date("2024-01-09T14:00:00"),
    appointmentTime: "2:00 PM - 4:00 PM",
    assignmentType: "contractor",
    assignedTo: "Mike Johnson",
    assignedContractorId: "contractor1",
    estimatedCost: 120,
    autoScheduled: true,
  },
  {
    id: "4",
    referenceNumber: "RP-901234",
    title: "Appliance Not Working",
    description: "Microwave stopped working completely. No power at all.",
    category: "Kitchen",
    issueType: "appliance",
    status: "open",
    priority: "low",
    customerName: "Alex Rodriguez",
    apartment: "C023",
    photoCount: 3,
    createdAt: new Date("2024-01-07T11:20:00"),
    updatedAt: new Date("2024-01-07T11:20:00"),
    assignmentType: "unassigned",
  },
  {
    id: "5",
    referenceNumber: "RP-567890",
    title: "Window/Door Issue",
    description: "Balcony door handle is broken and door won't lock properly.",
    category: "Living Room",
    issueType: "window",
    status: "closed",
    priority: "medium",
    customerName: "Lisa Thompson",
    apartment: "F003",
    photoCount: 1,
    createdAt: new Date("2024-01-05T08:30:00"),
    updatedAt: new Date("2024-01-06T16:45:00"),
    appointmentDate: new Date("2024-01-06T09:00:00"),
    appointmentTime: "9:00 AM - 11:00 AM",
    assignmentType: "contractor",
    assignedTo: "Emily Brown",
    assignedContractorId: "contractor4",
    estimatedCost: 95,
    autoScheduled: true,
  },
  {
    id: "6",
    referenceNumber: "RP-111222",
    title: "General Maintenance",
    description: "Light bulbs need to be replaced in the hallway and bathroom.",
    category: "General",
    issueType: "maintenance",
    status: "open",
    priority: "low",
    customerName: "David Kim",
    apartment: "E012",
    photoCount: 0,
    createdAt: new Date("2024-01-09T14:30:00"),
    updatedAt: new Date("2024-01-10T09:15:00"),
    appointmentDate: new Date("2024-01-11T16:00:00"),
    appointmentTime: "4:00 PM - 5:00 PM",
    assignmentType: "contractor",
    assignedTo: "Emily Brown",
    assignedContractorId: "contractor4",
    autoScheduled: true,
  },
  {
    id: "7",
    referenceNumber: "RP-222333",
    title: "Kitchen Appliance Issue",
    description: "Dishwasher is making loud noises and not cleaning properly.",
    category: "Kitchen",
    issueType: "appliance",
    status: "open",
    priority: "medium",
    customerName: "Sarah Davis",
    apartment: "A015",
    photoCount: 1,
    createdAt: new Date("2024-01-11T08:20:00"),
    updatedAt: new Date("2024-01-11T08:20:00"),
    assignmentType: "unassigned",
  },
  {
    id: "8",
    referenceNumber: "RP-333444",
    title: "Electrical Problem",
    description: "Power outlets in living room are not working.",
    category: "Living Room",
    issueType: "electrical",
    status: "open",
    priority: "high",
    customerName: "Mark Wilson",
    apartment: "C023",
    photoCount: 0,
    createdAt: new Date("2024-01-10T16:45:00"),
    updatedAt: new Date("2024-01-10T16:45:00"),
    appointmentDate: new Date("2024-01-13T09:00:00"),
    appointmentTime: "9:00 AM - 11:00 AM",
    assignmentType: "contractor",
    assignedTo: "Sarah Williams",
    assignedContractorId: "contractor2",
    autoScheduled: true,
  },
  {
    id: "9",
    referenceNumber: "RP-444555",
    title: "Window Lock Issue",
    description: "Bedroom window lock is broken and window won't stay closed.",
    category: "Bedroom",
    issueType: "window",
    status: "open",
    priority: "medium",
    customerName: "Linda Brown",
    apartment: "B033",
    photoCount: 2,
    createdAt: new Date("2024-01-11T12:30:00"),
    updatedAt: new Date("2024-01-11T12:30:00"),
    appointmentDate: new Date("2024-01-16T08:00:00"),
    appointmentTime: "8:00 AM - 10:00 AM",
    assignmentType: "contractor",
    assignedTo: "Secure Windows & Doors",
    assignedContractorId: "contractor8",
    autoScheduled: true,
  },
  {
    id: "10",
    referenceNumber: "RP-555666",
    title: "Door Handle Problem",
    description: "Front door handle is loose and difficult to turn.",
    category: "General",
    issueType: "door",
    status: "open",
    priority: "low",
    customerName: "James Taylor",
    apartment: "C012",
    photoCount: 0,
    createdAt: new Date("2024-01-10T09:15:00"),
    updatedAt: new Date("2024-01-10T09:15:00"),
    appointmentDate: new Date("2024-01-17T14:00:00"),
    appointmentTime: "2:00 PM - 4:00 PM",
    assignmentType: "contractor",
    assignedTo: "Secure Windows & Doors",
    assignedContractorId: "contractor8",
    autoScheduled: true,
  },
  {
    id: "11",
    referenceNumber: "RP-666777",
    title: "Lighting Issue",
    description: "Ceiling light in bathroom is flickering constantly.",
    category: "Bathroom",
    issueType: "lighting",
    status: "open",
    priority: "medium",
    customerName: "Anna Martinez",
    apartment: "E067",
    photoCount: 1,
    createdAt: new Date("2024-01-11T14:20:00"),
    updatedAt: new Date("2024-01-11T14:20:00"),
    appointmentDate: new Date("2024-01-18T15:00:00"),
    appointmentTime: "3:00 PM - 5:00 PM",
    assignmentType: "contractor",
    assignedTo: "Total Maintenance Services",
    assignedContractorId: "contractor9",
    autoScheduled: true,
  },
  {
    id: "12",
    referenceNumber: "RP-777888",
    title: "Heating System Failure",
    description: "No heat in apartment, very cold especially at night.",
    category: "General",
    issueType: "heating",
    status: "open",
    priority: "urgent",
    customerName: "Robert Johnson",
    apartment: "A099",
    photoCount: 0,
    createdAt: new Date("2024-01-09T19:30:00"),
    updatedAt: new Date("2024-01-11T10:15:00"),
    appointmentDate: new Date("2024-01-19T09:00:00"),
    appointmentTime: "9:00 AM - 11:00 AM",
    assignmentType: "contractor",
    assignedTo: "Climate Control Specialists",
    assignedContractorId: "contractor11",
    autoScheduled: true,
  },
  {
    id: "13",
    referenceNumber: "RP-888999",
    title: "Plumbing Leak",
    description: "Small leak under bathroom sink, water damage possible.",
    category: "Bathroom",
    issueType: "plumbing",
    status: "open",
    priority: "high",
    customerName: "Carol White",
    apartment: "F034",
    photoCount: 3,
    createdAt: new Date("2024-01-10T07:45:00"),
    updatedAt: new Date("2024-01-11T09:30:00"),
    appointmentDate: new Date("2024-01-20T10:00:00"),
    appointmentTime: "10:00 AM - 12:00 PM",
    assignmentType: "contractor",
    assignedTo: "Advanced Plumbing Systems",
    assignedContractorId: "contractor13",
    autoScheduled: true,
  },
  {
    id: "14",
    referenceNumber: "RP-999000",
    title: "Door Alignment Issue",
    description: "Bathroom door doesn't close properly, gap at the bottom.",
    category: "Bathroom",
    issueType: "door",
    status: "open",
    priority: "medium",
    customerName: "Steven Lee",
    apartment: "D045",
    photoCount: 1,
    createdAt: new Date("2024-01-11T11:00:00"),
    updatedAt: new Date("2024-01-11T11:00:00"),
    appointmentDate: new Date("2024-01-21T13:00:00"),
    appointmentTime: "1:00 PM - 3:00 PM",
    assignmentType: "contractor",
    assignedTo: "Elite Door & Window Co",
    assignedContractorId: "contractor14",
    autoScheduled: true,
  },
  {
    id: "15",
    referenceNumber: "RP-000111",
    title: "Noisy Neighbors",
    description: "Upstairs neighbors are very loud, especially at night.",
    category: "General",
    issueType: "noise",
    status: "open",
    priority: "low",
    customerName: "Patricia Green",
    apartment: "B022",
    photoCount: 0,
    createdAt: new Date("2024-01-12T22:15:00"),
    updatedAt: new Date("2024-01-12T22:15:00"),
    assignmentType: "unassigned",
  },
  {
    id: "16",
    referenceNumber: "RP-111222",
    title: "WiFi Issues",
    description: "Internet connection keeps dropping in the apartment.",
    category: "General",
    issueType: "internet",
    status: "open",
    priority: "medium",
    customerName: "Kevin Murphy",
    apartment: "C044",
    photoCount: 0,
    createdAt: new Date("2024-01-12T14:30:00"),
    updatedAt: new Date("2024-01-12T14:30:00"),
    assignmentType: "unassigned",
  },
];

const statusConfig: Record<
  IssueStatus,
  { label: string; color: string; icon: LucideIcon }
> = {
  open: { label: "Open", color: "badge-primary", icon: AlertCircleIcon },
  resolved: {
    label: "Resolved",
    color: "badge-success",
    icon: CheckCircleIcon,
  },
  closed: { label: "Closed", color: "badge-neutral", icon: CheckCircleIcon },
};

const priorityConfig: Record<IssuePriority, { label: string; color: string }> =
  {
    low: { label: "Low", color: "badge-ghost" },
    medium: { label: "Medium", color: "badge-info" },
    high: { label: "High", color: "badge-warning" },
    urgent: { label: "Urgent", color: "badge-error" },
  };

const scheduleStatusConfig = {
  scheduled: { label: "Scheduled", color: "badge-info" },
  in_progress: { label: "In Progress", color: "badge-warning" },
  completed: { label: "Completed", color: "badge-success" },
};

type Tab = "issues" | "contractors";

export function IssuesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("issues");
  const [selectedCapability, setSelectedCapability] = useState<string>("all");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedContractorIssues, setSelectedContractorIssues] = useState<
    ContractorIssue[]
  >([]);

  const openIssues = mockIssues.filter((issue) => issue.status === "open");
  const scheduledIssues = mockIssues.filter(
    (issue) => issue.status === "open" && issue.appointmentDate,
  );

  // Get all unique capabilities
  const allCapabilities = Array.from(
    new Set(
      mockContractors.flatMap((contractor) =>
        contractor.capabilityRankings.map((cr) => cr.capability),
      ),
    ),
  );

  // Filter and sort contractors based on selected capability
  const filteredContractors = mockContractors
    .filter((contractor) => {
      if (selectedCapability === "all") return true;
      return contractor.capabilityRankings.some(
        (cr) => cr.capability === selectedCapability,
      );
    })
    .sort((a, b) => {
      if (selectedCapability === "all") {
        return b.rating - a.rating; // Sort by overall rating
      }

      // Sort by rank within selected capability (descending)
      const aRank =
        a.capabilityRankings.find((cr) => cr.capability === selectedCapability)
          ?.rank || 0;
      const bRank =
        b.capabilityRankings.find((cr) => cr.capability === selectedCapability)
          ?.rank || 0;
      return bRank - aRank;
    });

  const handleScheduleClick = (issues: ContractorIssue[]) => {
    setSelectedContractorIssues(issues);
    setShowScheduleModal(true);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-base-300 bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-base-content">
              Issues & Contractors
            </h1>
            <p className="text-sm text-base-content/70">
              Manage customer issues and optimize contractor logistics
            </p>
          </div>
          <div className="stats stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title text-xs">Open Issues</div>
              <div className="stat-value text-lg">{openIssues.length}</div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Scheduled</div>
              <div className="stat-value text-lg">{scheduledIssues.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="shrink-0 border-b border-base-300 bg-base-100 px-4">
        <div className="flex">
          <button
            className={classNames(
              "flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "issues"
                ? "border-primary bg-primary/5 text-primary"
                : "border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content",
            )}
            onClick={() => setActiveTab("issues")}
          >
            <AlertCircleIcon className="h-4 w-4" />
            Customer Issues
          </button>
          <button
            className={classNames(
              "flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "contractors"
                ? "border-primary bg-primary/5 text-primary"
                : "border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content",
            )}
            onClick={() => setActiveTab("contractors")}
          >
            <HardHatIcon className="h-4 w-4" />
            Contractors
          </button>
        </div>
      </div>

      {/* Capability Filter (only for contractors tab) */}
      {activeTab === "contractors" && (
        <div className="shrink-0 border-b border-base-300 bg-base-100 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              className={classNames(
                "btn btn-sm",
                selectedCapability === "all" ? "btn-primary" : "btn-outline",
              )}
              onClick={() => setSelectedCapability("all")}
            >
              All
            </button>
            {allCapabilities.map((capability) => (
              <button
                key={capability}
                className={classNames(
                  "btn capitalize btn-sm",
                  selectedCapability === capability
                    ? "btn-primary"
                    : "btn-outline",
                )}
                onClick={() => setSelectedCapability(capability)}
              >
                {capability}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "issues" ? (
          <div className="p-4">
            <div className="space-y-3">
              {mockIssues.map((issue) => {
                const StatusIcon = statusConfig[issue.status].icon;
                return (
                  <div
                    key={issue.id}
                    className="card border border-base-300 bg-base-100 shadow-sm"
                  >
                    <div className="card-body p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {issue.title}
                            </span>
                            <div
                              className={classNames(
                                "badge badge-xs",
                                statusConfig[issue.status].color,
                              )}
                            >
                              <StatusIcon className="mr-1 h-2 w-2" />
                              {statusConfig[issue.status].label}
                            </div>
                            <div
                              className={classNames(
                                "badge badge-xs",
                                priorityConfig[issue.priority].color,
                              )}
                            >
                              {priorityConfig[issue.priority].label}
                            </div>
                          </div>
                          <p className="line-clamp-2 text-xs text-base-content/70">
                            {issue.description}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button className="btn btn-ghost btn-xs">
                            <MessageSquareIcon className="h-3 w-3" />
                          </button>
                          <button className="btn btn-ghost btn-xs">
                            <PhoneIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-base-content/60">
                        <span>{issue.customerName}</span>
                        <span>Apt: {issue.apartment}</span>
                        <span>{format(issue.createdAt, "MMM d")}</span>
                        {issue.photoCount > 0 && (
                          <span className="flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {issue.photoCount}
                          </span>
                        )}
                        {issue.assignedTo && (
                          <span className="flex items-center gap-1">
                            {issue.assignmentType === "contractor" ? (
                              <HardHatIcon className="h-3 w-3" />
                            ) : (
                              <UserIcon className="h-3 w-3" />
                            )}
                            {issue.assignedTo}
                          </span>
                        )}
                      </div>
                      {issue.assignmentType === "unassigned" && (
                        <div className="mt-2 flex gap-2">
                          <button className="btn btn-xs btn-primary">
                            <WrenchIcon className="h-3 w-3" />
                            Auto Assign
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="mb-4 flex items-center justify-end">
              <button className="btn btn-sm btn-primary">
                <PlusIcon className="h-4 w-4" />
                Add Contractor
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Capabilities</th>
                    <th>Status</th>
                    <th>Scheduled</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContractors.map((contractor) => (
                    <tr key={contractor.id}>
                      <td>
                        <div className="text-sm">{contractor.company}</div>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {contractor.capabilityRankings.map((cr) => (
                            <div
                              key={cr.capability}
                              className={classNames(
                                "flex items-center gap-1 rounded-full px-2 py-1 text-xs",
                                selectedCapability === "all" ||
                                  selectedCapability === cr.capability
                                  ? "bg-primary/10 text-primary"
                                  : "bg-base-200 text-base-content/50",
                              )}
                            >
                              <span className="capitalize">
                                {cr.capability}
                              </span>
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={classNames(
                                      "h-2 w-2",
                                      i < cr.rank
                                        ? "fill-warning text-warning"
                                        : "text-base-300",
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div
                          className={classNames(
                            "badge badge-sm",
                            contractor.available
                              ? "badge-success"
                              : "badge-neutral",
                          )}
                        >
                          {contractor.available ? "Available" : "Unavailable"}
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={() =>
                            handleScheduleClick(contractor.scheduledIssues)
                          }
                        >
                          {contractor.scheduledIssues.length} issues
                        </button>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button className="btn btn-ghost btn-xs">
                            <EditIcon className="h-3 w-3" />
                          </button>
                          <button className="btn btn-ghost btn-xs">
                            <PhoneIcon className="h-3 w-3" />
                          </button>
                          <button className="btn btn-ghost btn-xs">
                            <MessageSquareIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="modal-open modal">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">Scheduled Issues</h3>
            <div className="space-y-3">
              {selectedContractorIssues.map((issue) => (
                <div key={issue.id} className="rounded-box bg-base-200 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-sm">
                      {issue.referenceNumber}
                    </span>
                    <div
                      className={classNames(
                        "badge badge-xs",
                        scheduleStatusConfig[issue.status].color,
                      )}
                    >
                      {scheduleStatusConfig[issue.status].label}
                    </div>
                  </div>
                  <div className="text-sm text-base-content/70">
                    {issue.apartment} • {issue.issueType}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <CalendarIcon className="h-3 w-3" />
                    {format(issue.date, "MMM d, yyyy")}
                    <ClockIcon className="h-3 w-3" />
                    {issue.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowScheduleModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
