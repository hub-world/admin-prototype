import classNames from "classnames";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  MessageSquareIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import { useState } from "react";

import { type Issue, mockContractors, mockIssues } from "./data";

export function ContractorsTab() {
  const [selectedCapability, setSelectedCapability] = useState<string>("all");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedContractorIssues, setSelectedContractorIssues] = useState<
    Issue[]
  >([]);

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

  const handleScheduleClick = (contractorId: string) => {
    const contractorIssues = mockIssues.filter(
      (issue) =>
        issue.assignedContractorId === contractorId && issue.appointment,
    );
    setSelectedContractorIssues(contractorIssues);
    setShowScheduleModal(true);
  };

  return (
    <>
      {/* Capability Filter */}
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
                          <span className="capitalize">{cr.capability}</span>
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
                      onClick={() => handleScheduleClick(contractor.id)}
                    >
                      {
                        mockIssues.filter(
                          (issue) =>
                            issue.assignedContractorId === contractor.id &&
                            issue.appointment,
                        ).length
                      }{" "}
                      issues
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
                        issue.status === "open"
                          ? "badge-info"
                          : issue.status === "resolved"
                            ? "badge-success"
                            : "badge-neutral",
                      )}
                    >
                      {issue.status === "open"
                        ? "Scheduled"
                        : issue.status === "resolved"
                          ? "Completed"
                          : issue.status}
                    </div>
                  </div>
                  <div className="text-sm text-base-content/70">
                    {issue.apartment} • {issue.issueType}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <CalendarIcon className="h-3 w-3" />
                    {format(issue.appointment!, "MMM d, yyyy")}
                    <ClockIcon className="h-3 w-3" />
                    {format(issue.appointment!, "HH:mm")}
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
    </>
  );
}
