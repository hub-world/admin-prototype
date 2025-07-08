import classNames from "classnames";
import {
  MailIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    role: "Admin",
    joined: "2023-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    role: "User",
    joined: "2023-02-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Inactive",
    role: "User",
    joined: "2023-03-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Active",
    role: "Moderator",
    joined: "2023-04-05",
  },
];

export function UsersPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Users</h1>
          <p className="mt-2 text-base-content/70">
            Manage your platform users
          </p>
        </div>
        <button className="btn btn-primary">
          <PlusIcon className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6 bg-base-100 shadow">
        <div className="card-body">
          <div className="flex flex-col gap-4 sm:flex-row">
            <label className="input-bordered input flex flex-1 items-center gap-2">
              <SearchIcon className="h-4 w-4 text-base-content/40" />
              <input
                type="text"
                className="grow"
                placeholder="Search users..."
              />
            </label>
            <div className="flex gap-2">
              <select className="select-bordered select">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select className="select-bordered select">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Moderator</option>
                <option>User</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar avatar-placeholder">
                          <div className="w-10 rounded-full bg-neutral text-neutral-content">
                            <span className="text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-base-content/50" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{user.role}</span>
                    </td>
                    <td>
                      <span
                        className={classNames("badge", {
                          "badge-success": user.status === "Active",
                          "badge-error": user.status !== "Active",
                        })}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-ghost btn-xs"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                        >
                          <li>
                            <a>Edit</a>
                          </li>
                          <li>
                            <a>View Details</a>
                          </li>
                          <li>
                            <a>Reset Password</a>
                          </li>
                          <div className="divider my-0"></div>
                          <li>
                            <a className="text-error">Delete</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
