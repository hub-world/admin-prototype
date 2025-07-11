import classNames from "classnames";
import { format } from "date-fns";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  type LucideIcon,
  MessageSquareIcon,
  PhoneIcon,
  ImageIcon,
  WrenchIcon,
  ZapIcon,
} from "lucide-react";
import { mockIssues, mockContractors, type IssueStatus, type IssuePriority } from "./data";

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

export function IssuesTab() {
  return (
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
                  {issue.assignedContractorId && (
                    <span className="flex items-center gap-1">
                      <WrenchIcon className="h-3 w-3" />
                      {mockContractors.find(c => c.id === issue.assignedContractorId)?.company}
                    </span>
                  )}
                </div>
                {issue.assignmentType === "unassigned" && (
                  <div className="mt-2 flex gap-2">
                    <button className="btn btn-xs btn-primary">
                      <ZapIcon className="h-3 w-3" />
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
  );
}