import classNames from "classnames";
import {
  addDays,
  format,
  isBefore,
  isSameDay,
  isToday as isTodayFn,
} from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ListFilterIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

interface UnitType {
  id: string;
  name: string;
  color: string;
  units: Unit[];
}

interface Unit {
  id: string;
  number: string;
  type: string;
}

interface Booking {
  id: string;
  unitId: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  status: "confirmed" | "pending" | "cancelled";
}

const unitTypes: UnitType[] = [
  {
    id: "economy",
    name: "Economy",
    color: "bg-blue-500",
    units: Array.from({ length: 123 }, (_, i) => ({
      id: `eco-${i + 1}`,
      number: `E${String(i + 1).padStart(3, "0")}`,
      type: "economy",
    })),
  },
  {
    id: "premium",
    name: "Premium",
    color: "bg-green-500",
    units: Array.from({ length: 98 }, (_, i) => ({
      id: `prem-${i + 1}`,
      number: `P${String(i + 1).padStart(3, "0")}`,
      type: "premium",
    })),
  },
  {
    id: "business",
    name: "Business",
    color: "bg-purple-500",
    units: Array.from({ length: 20 }, (_, i) => ({
      id: `bus-${i + 1}`,
      number: `B${String(i + 1).padStart(3, "0")}`,
      type: "business",
    })),
  },
  {
    id: "first-class",
    name: "First-Class",
    color: "bg-amber-500",
    units: Array.from({ length: 10 }, (_, i) => ({
      id: `fc-${i + 1}`,
      number: `F${String(i + 1).padStart(3, "0")}`,
      type: "first-class",
    })),
  },
  {
    id: "capsules",
    name: "Capsules",
    color: "bg-red-500",
    units: Array.from({ length: 50 }, (_, i) => ({
      id: `cap-${i + 1}`,
      number: `C${String(i + 1).padStart(3, "0")}`,
      type: "capsules",
    })),
  },
];

// Generate random sample bookings with 90% occupancy
const generateRandomBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  const allUnits = unitTypes.flatMap((type) => type.units);
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 90); // Generate bookings for next 90 days

  const guestNames = [
    "John Doe",
    "Jane Smith",
    "Bob Johnson",
    "Alice Brown",
    "Charlie Davis",
    "Diana Evans",
    "Frank Miller",
    "Grace Wilson",
    "Henry Moore",
    "Ivy Taylor",
    "Jack Anderson",
    "Karen Thomas",
    "Leo Jackson",
    "Mia White",
    "Noah Harris",
    "Olivia Martin",
    "Paul Thompson",
    "Quinn Garcia",
    "Ruby Rodriguez",
    "Sam Lewis",
    "Tina Walker",
    "Uma Hall",
    "Victor Allen",
    "Wendy Young",
    "Xavier King",
    "Yara Wright",
    "Zoe Lopez",
    "Adam Hill",
    "Bella Scott",
    "Chris Green",
  ];

  // Generate status with proper distribution: 85% confirmed, 10% pending, 5% cancelled
  const getRandomStatus = (): "confirmed" | "pending" | "cancelled" => {
    const rand = Math.random();
    if (rand < 0.85) return "confirmed";
    if (rand < 0.95) return "pending";
    return "cancelled";
  };

  for (const unit of allUnits) {
    let currentDate = new Date(today);

    while (currentDate < endDate) {
      // Determine if this day should be occupied (90% occupancy rate)
      const shouldBeOccupied = Math.random() < 0.9;

      if (shouldBeOccupied) {
        // Random stay length based on unit type
        let stayLength;
        if (unit.type === "capsules") {
          // Capsules: all short term (1-14 days)
          stayLength = Math.floor(Math.random() * 14) + 1;
        } else {
          // Other units: 50% short term, 50% long term
          if (Math.random() < 0.5) {
            // 50% short term (1-29 days)
            stayLength = Math.floor(Math.random() * 29) + 1;
          } else {
            // 50% long term (30-365 days, up to 12 months)
            stayLength = Math.floor(Math.random() * 336) + 30;
          }
        }

        const checkIn = new Date(currentDate);
        const checkOut = new Date(currentDate);
        checkOut.setDate(checkIn.getDate() + stayLength);

        bookings.push({
          id: `${unit.id}-${checkIn.getTime()}`,
          unitId: unit.id,
          checkIn,
          checkOut,
          guestName: guestNames[Math.floor(Math.random() * guestNames.length)],
          status: getRandomStatus(),
        });

        // Move to the end of this booking
        currentDate = new Date(checkOut);
      } else {
        // Single day gap (10% chance per day)
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  return bookings;
};

const sampleBookings: Booking[] = generateRandomBookings();

export function ReservationsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings] = useState<Booking[]>(sampleBookings);

  const [filterText, setFilterText] = useState("");

  // Generate calendar days (14 days view starting from today)
  const calendarDays = useMemo(() => {
    const days = [];
    const start = new Date(currentDate);

    for (let i = 0; i < 14; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  }, [currentDate]);

  // Filter unit types based on search text
  const filteredUnitTypes = useMemo(() => {
    if (!filterText.trim()) return unitTypes;

    return unitTypes
      .map((unitType) => ({
        ...unitType,
        units: unitType.units.filter(
          (unit) =>
            unit.number.toLowerCase().includes(filterText.toLowerCase()) ||
            unitType.name.toLowerCase().includes(filterText.toLowerCase()),
        ),
      }))
      .filter((unitType) => unitType.units.length > 0);
  }, [filterText]);

  const getBookingForUnitAndDate = (unitId: string, date: Date) => {
    return bookings.find((booking) => {
      return (
        booking.unitId === unitId &&
        !isBefore(date, booking.checkIn) &&
        isBefore(date, booking.checkOut)
      );
    });
  };

  const getBookingSpanInfo = (booking: Booking, date: Date) => {
    const isStart = isSameDay(date, booking.checkIn);
    const isEnd = isSameDay(date, addDays(booking.checkOut, -1));
    const visibleDays = calendarDays.filter(
      (day) =>
        !isBefore(day, booking.checkIn) && isBefore(day, booking.checkOut),
    );
    const dayIndex = visibleDays.findIndex((day) => isSameDay(day, date));

    return {
      isStart,
      isEnd,
      dayIndex,
      totalVisibleDays: visibleDays.length,
      isVisible: dayIndex >= 0,
    };
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 14 : -14));
    setCurrentDate(newDate);
  };

  return (
    <div className="flex h-full flex-col bg-base-100 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-base-content">Unit Planner</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateDate("prev")}
            className="btn btn-circle btn-outline btn-sm"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">
            {format(calendarDays[0] || new Date(), "MMM yyyy")}
          </span>
          <button
            onClick={() => navigateDate("next")}
            className="btn btn-circle btn-outline btn-sm"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Calendar Header */}
          <div className="sticky top-0 z-40 border-b border-base-300 bg-base-100">
            <div className="flex">
              <div className="sticky top-0 left-0 z-50 w-48 shrink-0 border-r border-base-300 bg-base-200 p-2">
                <label className="input input-sm">
                  <ListFilterIcon className="h-4 w-4 text-base-content/60" />
                  <input
                    type="text"
                    placeholder="Filter units"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </label>
              </div>
              {calendarDays.map((day) => {
                return (
                  <div
                    key={day.toISOString()}
                    className={classNames(
                      "w-12 shrink-0 border-r border-base-300 p-2 text-center",
                      isTodayFn(day)
                        ? "bg-primary text-primary-content"
                        : "bg-base-200",
                    )}
                  >
                    <div className="text-xs">{format(day, "E")}</div>
                    <div className="text-sm font-medium">
                      {format(day, "d")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unit Types and Units */}
          {filteredUnitTypes.map((unitType) => (
            <div key={unitType.id} className="border-b border-base-300">
              {/* Unit Type Header */}
              <div className="flex bg-base-200">
                <div className="sticky left-0 z-20 w-48 shrink-0 border-r border-base-300 bg-base-200 px-2 py-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={classNames("h-3 w-3 rounded", unitType.color)}
                    />
                    <span className="text-sm font-semibold">
                      {unitType.name}
                    </span>
                    <span className="text-xs text-base-content/70">
                      ({unitType.units.length})
                    </span>
                  </div>
                </div>
                {calendarDays.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="w-12 shrink-0 border-r border-base-300 bg-base-200"
                  />
                ))}
              </div>

              {/* Unit Rows */}
              {unitType.units.slice(0, 10).map((unit) => (
                <div key={unit.id} className="flex border-b border-base-300/50">
                  <div className="sticky left-0 z-20 w-48 shrink-0 border-r border-base-300 bg-base-100 px-2 py-1">
                    <span className="text-sm">{unit.number}</span>
                  </div>
                  {calendarDays.map((day) => {
                    const booking = getBookingForUnitAndDate(unit.id, day);

                    let bookingSpan = null;
                    if (booking) {
                      const spanInfo = getBookingSpanInfo(booking, day);
                      if (spanInfo.isVisible) {
                        bookingSpan = spanInfo;
                      }
                    }

                    return (
                      <div
                        key={day.toISOString()}
                        className="relative h-8 w-12 shrink-0 border-r border-base-300 p-1"
                      >
                        {booking && bookingSpan && (
                          <div
                            className={classNames(
                              "absolute top-1 flex h-6 items-center text-xs text-white",
                              booking.status === "confirmed" && "bg-green-500",
                              booking.status === "pending" && "bg-yellow-500",
                              booking.status === "cancelled" && "bg-red-500",
                              bookingSpan.isStart &&
                                bookingSpan.isEnd &&
                                "rounded",
                              bookingSpan.isStart &&
                                !bookingSpan.isEnd &&
                                "rounded-l",
                              !bookingSpan.isStart &&
                                bookingSpan.isEnd &&
                                "rounded-r",
                            )}
                            style={{
                              left: bookingSpan.isStart ? 4 : 0,
                              width:
                                48 -
                                (bookingSpan.isStart ? 4 : 0) -
                                (bookingSpan.isEnd ? 4 : 0),
                            }}
                            title={`${booking.guestName} (${booking.status})`}
                          >
                            {bookingSpan.isStart && (
                              <span className="z-20 pl-2 whitespace-nowrap">
                                {booking.guestName.split(" ")[0]}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {unitType.units.length > 10 && (
                <div className="flex bg-base-100/50">
                  <div className="sticky left-0 z-20 w-48 shrink-0 border-r border-base-300 bg-base-100 px-2 py-1">
                    <span className="text-xs text-base-content/70">
                      +{unitType.units.length - 10} more units
                    </span>
                  </div>
                  {calendarDays.map((day) => (
                    <div
                      key={day.toISOString()}
                      className="w-12 shrink-0 border-r border-base-300 bg-base-100/50"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500" />
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-red-500" />
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
}
