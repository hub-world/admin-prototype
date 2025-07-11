import classNames from "classnames";
import { addDays, format } from "date-fns";
import React from "react";

import { mockContractors, mockIssues } from "./data";

export function CalendarTab() {
  // Get all upcoming appointments from mockIssues only (single source of truth)
  // This avoids duplicates since contractor.scheduledIssues should mirror mockIssues
  const upcomingAppointments = mockIssues
    .filter((issue) => issue.appointment && issue.status === "open")
    .map((issue) => ({
      id: issue.id,
      referenceNumber: issue.referenceNumber,
      title: issue.title,
      appointment: issue.appointment!,
      duration: issue.duration || 1,
      apartment: issue.apartment,
      customerName: issue.customerName,
      type: "issue" as const,
      priority: issue.priority,
      status: issue.status,
      contractor: mockContractors.find(
        (c) => c.id === issue.assignedContractorId,
      )?.company,
    }))
    .sort((a, b) => a.appointment.getTime() - b.appointment.getTime());

  // Group appointments by date for calendar view
  const appointmentsByDate = upcomingAppointments.reduce(
    (acc, appointment) => {
      const dateKey = format(appointment.appointment, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(appointment);
      return acc;
    },
    {} as Record<string, typeof upcomingAppointments>,
  );

  // Generate calendar grid for next 7 days
  const calendarDays = Array.from({ length: 7 }, (_, i) =>
    addDays(new Date(), i),
  );
  const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <div className="grid min-w-[800px] grid-cols-8">
          {/* Time column header */}
          <div className="sticky top-0 left-0 z-30 border-b border-base-300 bg-base-100 p-2 text-xs font-semibold text-base-content/70">
            Time
          </div>
          {/* Date headers */}
          {calendarDays.map((day) => (
            <div
              key={day.toISOString()}
              className="sticky top-0 z-20 border-b border-base-300 bg-base-100 p-2 text-center text-xs font-semibold"
            >
              <div>{format(day, "EEE")}</div>
              <div className="text-lg font-bold">{format(day, "d")}</div>
            </div>
          ))}
          {/* Time slots */}
          {timeSlots.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time label */}
              <div className="sticky left-0 z-20 border-r border-base-300 bg-base-100 p-2 text-xs text-base-content/70">
                {format(new Date().setHours(hour, 0), "HH:mm")}
              </div>
              {/* Day cells */}
              {calendarDays.map((day) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayAppointments = appointmentsByDate[dayKey] || [];

                // Get appointments that start at this hour only
                const hourAppointments = dayAppointments.filter((apt) => {
                  return apt.appointment.getHours() === hour;
                });

                return (
                  <div
                    key={`${dayKey}-${hour}`}
                    className="relative min-h-[60px] border-r border-b border-base-300 p-1"
                  >
                    {hourAppointments.map((appointment) => {
                      return (
                        <div
                          key={appointment.id}
                          className={classNames(
                            "absolute rounded-lg p-2 text-xs font-medium backdrop-blur-sm",
                            appointment.priority === "urgent"
                              ? "border border-error bg-error/40 text-error-content"
                              : appointment.priority === "high"
                                ? "border border-warning bg-warning/40 text-warning-content"
                                : appointment.priority === "medium"
                                  ? "border border-info bg-info/40 text-info-content"
                                  : "border border-success bg-success/40 text-success-content",
                          )}
                          style={{
                            top: `calc(${(appointment.appointment.getMinutes() / 60) * 100}% + 4px)`,
                            height: `${appointment.duration * 60 - 8}px`,
                            left: "4px",
                            width: "calc(100% - 8px)",
                            zIndex: 10,
                          }}
                        >
                          <div className="truncate font-semibold">
                            {appointment.contractor || "Unassigned"}
                          </div>
                          <div className="truncate text-xs opacity-90">
                            {appointment.apartment}
                          </div>
                          {appointment.duration > 1 && (
                            <div className="truncate text-xs opacity-75">
                              {appointment.duration}h
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
