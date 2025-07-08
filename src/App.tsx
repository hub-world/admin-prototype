import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { UsersPage } from "./pages/UsersPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/properties"
          element={
            <div className="p-6">
              <h1 className="text-3xl font-bold">Properties</h1>
              <p className="mt-2 text-base-content/70">
                Property management coming soon...
              </p>
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div className="p-6">
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="mt-2 text-base-content/70">
                Settings panel coming soon...
              </p>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
