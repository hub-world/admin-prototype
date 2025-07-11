import classNames from "classnames";
import { AlertCircleIcon, CalendarIcon, WrenchIcon } from "lucide-react";
import { NavLink, Route, Routes } from "react-router";

import { CalendarTab } from "./CalendarTab";
import { ContractorsTab } from "./ContractorsTab";
import { IssuesTab } from "./IssuesTab";
import { mockIssues } from "./data";

export function IssuesPage() {
  const openIssues = mockIssues.filter((issue) => issue.status === "open");
  const scheduledIssues = mockIssues.filter(
    (issue) => issue.status === "open" && issue.appointment,
  );

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
          <NavLink
            to="/issues"
            end
            className={({ isActive }) =>
              classNames(
                "flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content",
              )
            }
          >
            <AlertCircleIcon className="h-4 w-4" />
            Issues
          </NavLink>
          <NavLink
            to="/issues/contractors"
            className={({ isActive }) =>
              classNames(
                "flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content",
              )
            }
          >
            <WrenchIcon className="h-4 w-4" />
            Contractors
          </NavLink>
          <NavLink
            to="/issues/calendar"
            className={({ isActive }) =>
              classNames(
                "flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-transparent text-base-content/60 hover:bg-base-200 hover:text-base-content",
              )
            }
          >
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </NavLink>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<IssuesTab />} />
          <Route path="contractors" element={<ContractorsTab />} />
          <Route path="calendar" element={<CalendarTab />} />
        </Routes>
      </div>
    </div>
  );
}
