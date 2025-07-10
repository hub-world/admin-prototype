import classNames from "classnames";
import { addDays, format, subDays } from "date-fns";
import {
  ChevronDownIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  checkIn?: Date;
  checkOut?: Date;
  unitNumber?: string;
  unitType: string;
  totalStays: number;
  totalNights: number;
  status: "current" | "upcoming" | "past" | "inquiry";
  notes?: string;
}

const generateCustomers = (): Customer[] => {
  const firstNames = [
    "Emma", "Liam", "Sophia", "Noah", "Isabella", "Oliver", "Ava", "William",
    "Mia", "James", "Charlotte", "Benjamin", "Harper", "Lucas", "Evelyn",
    "Henry", "Abigail", "Alexander", "Emily", "Mason", "Elizabeth", "Michael",
    "Mila", "Ethan", "Ella", "Daniel", "Avery", "Jacob", "Sofia", "Logan",
    "Camila", "Jackson", "Aria", "Levi", "Scarlett", "Sebastian", "Victoria",
    "Mateo", "Madison", "Jack", "Luna", "Owen", "Grace", "Theodore", "Chloe",
    "Aiden", "Penelope", "Samuel", "Layla", "Joseph", "Riley"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
    "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King",
    "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green",
    "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell",
    "Carter", "Roberts", "Gomez", "Phillips", "Evans", "Turner"
  ];

  const nationalities = [
    "German", "American", "British", "French", "Italian", "Spanish", "Dutch",
    "Swedish", "Danish", "Norwegian", "Canadian", "Australian", "Swiss",
    "Austrian", "Belgian", "Irish", "Finnish", "Portuguese", "Japanese",
    "Korean", "Brazilian", "Mexican", "Indian", "Chinese", "Russian"
  ];

  const unitTypes = ["Economy", "Premium", "Business", "First", "Capsules"];

  const customers: Customer[] = [];
  const today = new Date();

  for (let i = 0; i < 150; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
      ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "company.com"][
        Math.floor(Math.random() * 5)
      ]
    }`;
    
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const unitType = unitTypes[Math.floor(Math.random() * unitTypes.length)];
    
    // Generate phone number based on nationality
    const getPhonePrefix = (nat: string) => {
      const prefixes: Record<string, string> = {
        "German": "+49 ",
        "American": "+1 ",
        "British": "+44 ",
        "French": "+33 ",
        "Italian": "+39 ",
        "Spanish": "+34 ",
        "Dutch": "+31 ",
        "Swedish": "+46 ",
        "Danish": "+45 ",
        "Norwegian": "+47 ",
        "Canadian": "+1 ",
        "Australian": "+61 ",
        "Swiss": "+41 ",
        "Austrian": "+43 ",
        "Belgian": "+32 ",
        "Irish": "+353 ",
        "Finnish": "+358 ",
        "Portuguese": "+351 ",
        "Japanese": "+81 ",
        "Korean": "+82 ",
        "Brazilian": "+55 ",
        "Mexican": "+52 ",
        "Indian": "+91 ",
        "Chinese": "+86 ",
        "Russian": "+7 ",
      };
      return prefixes[nat] || "+49 ";
    };

    const phone = getPhonePrefix(nationality) + Math.floor(Math.random() * 900000000 + 100000000);
    
    // Determine status and dates
    const statusRand = Math.random();
    let status: Customer["status"];
    let checkIn: Date | undefined;
    let checkOut: Date | undefined;
    let unitNumber: string | undefined;

    if (statusRand < 0.3) {
      // 30% current guests
      status = "current";
      checkIn = subDays(today, Math.floor(Math.random() * 30));
      if (unitType === "Capsules") {
        // Capsules: short term only (1-14 days)
        checkOut = addDays(checkIn, Math.floor(Math.random() * 14) + 1);
      } else {
        checkOut = addDays(today, Math.floor(Math.random() * 90) + 1);
      }
      unitNumber = getUnitNumber(unitType);
    } else if (statusRand < 0.45) {
      // 15% upcoming guests
      status = "upcoming";
      checkIn = addDays(today, Math.floor(Math.random() * 60) + 1);
      if (unitType === "Capsules") {
        // Capsules: short term only (1-14 days)
        checkOut = addDays(checkIn, Math.floor(Math.random() * 14) + 1);
      } else {
        checkOut = addDays(checkIn, Math.floor(Math.random() * 180) + 7);
      }
      unitNumber = getUnitNumber(unitType);
    } else if (statusRand < 0.8) {
      // 35% past guests
      status = "past";
      checkOut = subDays(today, Math.floor(Math.random() * 365));
      if (unitType === "Capsules") {
        // Capsules: short term only (1-14 days)
        checkIn = subDays(checkOut, Math.floor(Math.random() * 14) + 1);
      } else {
        checkIn = subDays(checkOut, Math.floor(Math.random() * 180) + 1);
      }
    } else {
      // 20% inquiries
      status = "inquiry";
    }

    const totalStays = Math.floor(Math.random() * 5) + 1;
    const totalNights = Math.floor(Math.random() * 200) + 5;

    customers.push({
      id: `cust-${i + 1}`,
      firstName,
      lastName,
      email,
      phone,
      nationality,
      checkIn,
      checkOut,
      unitNumber,
      unitType,
      totalStays,
      totalNights,
      status,
      notes: Math.random() > 0.7 ? "Prefers quiet room" : undefined,
    });
  }

  return customers.sort((a, b) => {
    // Sort by status priority: current > upcoming > inquiry > past
    const statusOrder = { current: 0, upcoming: 1, inquiry: 2, past: 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    // Then by last name
    return a.lastName.localeCompare(b.lastName);
  });
};

function getUnitNumber(unitType: string): string {
  const prefixes: Record<string, string> = {
    "Economy": "E",
    "Premium": "P", 
    "Business": "B",
    "First": "F",
    "Capsules": "C"
  };
  
  const maxUnits: Record<string, number> = {
    "Economy": 123,
    "Premium": 98,
    "Business": 20,
    "First": 10,
    "Capsules": 50
  };

  const prefix = prefixes[unitType] || "E";
  const number = Math.floor(Math.random() * maxUnits[unitType]) + 1;
  return `${prefix}${String(number).padStart(3, "0")}`;
}

const customers = generateCustomers();

export function CustomersPage() {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<Customer["status"] | "all">("all");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = 
        customer.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
        customer.nationality.toLowerCase().includes(searchText.toLowerCase()) ||
        (customer.unitNumber?.toLowerCase().includes(searchText.toLowerCase()));

      const matchesStatus = statusFilter === "all" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter]);

  const getStatusColor = (status: Customer["status"]) => {
    switch (status) {
      case "current":
        return "badge-success";
      case "upcoming":
        return "badge-info";
      case "inquiry":
        return "badge-warning";
      case "past":
        return "badge-neutral";
      default:
        return "badge-neutral";
    }
  };

  const getStatusLabel = (status: Customer["status"]) => {
    switch (status) {
      case "current":
        return "Current";
      case "upcoming":
        return "Upcoming";
      case "inquiry":
        return "Inquiry";
      case "past":
        return "Past";
      default:
        return status;
    }
  };

  return (
    <div className="flex h-full flex-col bg-base-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Customers</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <label className="input w-80">
          <SearchIcon className="h-4 w-4 text-base-content/60" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
        
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-outline">
            Status: {statusFilter === "all" ? "All" : getStatusLabel(statusFilter)}
            <ChevronDownIcon className="h-4 w-4" />
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li><a onClick={() => setStatusFilter("all")}>All</a></li>
            <li><a onClick={() => setStatusFilter("current")}>Current</a></li>
            <li><a onClick={() => setStatusFilter("upcoming")}>Upcoming</a></li>
            <li><a onClick={() => setStatusFilter("inquiry")}>Inquiries</a></li>
            <li><a onClick={() => setStatusFilter("past")}>Past</a></li>
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Current Stay</th>
              <th>Unit</th>
              <th>History</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar-placeholder">
                      <div className="bg-neutral text-neutral-content w-10 rounded-full">
                        <span className="text-sm font-medium">
                          {customer.firstName[0]}{customer.lastName[0]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="text-sm text-base-content/70">
                        {customer.nationality}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <MailIcon className="h-3 w-3" />
                      <a href={`mailto:${customer.email}`} className="link link-hover">
                        {customer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-base-content/70">
                      <PhoneIcon className="h-3 w-3" />
                      <a href={`tel:${customer.phone}`} className="link link-hover">
                        {customer.phone}
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  {customer.checkIn && customer.checkOut ? (
                    <div className="text-sm">
                      <div className="font-medium whitespace-nowrap">
                        {format(customer.checkIn, "MMM d")} - {format(customer.checkOut, "MMM d")}
                      </div>
                      <div className="text-base-content/70">
                        {(() => {
                          const nights = Math.ceil((customer.checkOut.getTime() - customer.checkIn.getTime()) / (1000 * 60 * 60 * 24));
                          if (nights >= 30) {
                            const months = Math.round(nights / 30);
                            return `${months} month${months > 1 ? 's' : ''}`;
                          }
                          return `${nights} night${nights > 1 ? 's' : ''}`;
                        })()}
                      </div>
                    </div>
                  ) : (
                    <span className="text-base-content/50">-</span>
                  )}
                </td>
                <td>
                  {customer.unitNumber ? (
                    <div className="text-sm">
                      <div className="font-medium">{customer.unitNumber}</div>
                      <div className="text-base-content/70">{customer.unitType}</div>
                    </div>
                  ) : (
                    <span className="text-base-content/50">-</span>
                  )}
                </td>
                <td>
                  <div className="text-sm">
                    <div>{customer.totalStays} stays</div>
                    <div className="text-base-content/70">{customer.totalNights} nights</div>
                  </div>
                </td>
                <td>
                  <div className={classNames("badge badge-sm", getStatusColor(customer.status))}>
                    {getStatusLabel(customer.status)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCustomers.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <UserIcon className="mx-auto h-12 w-12 text-base-content/30" />
              <h3 className="mt-2 text-sm font-medium text-base-content">No customers found</h3>
              <p className="mt-1 text-sm text-base-content/70">
                Try adjusting your search or filters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}