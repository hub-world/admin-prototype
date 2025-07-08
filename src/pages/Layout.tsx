import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar className="shrink-0" />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-auto bg-base-100">{children}</main>
      </div>
    </div>
  );
}
