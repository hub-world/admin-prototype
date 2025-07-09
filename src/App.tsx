import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import { ReservationsPage } from "./pages/ReservationsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
