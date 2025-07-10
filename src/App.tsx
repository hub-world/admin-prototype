import { Route, Routes } from "react-router";

import { CustomersPage } from "./pages/CustomersPage";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";
import MessagesPage from "./pages/MessagesPage";
import { ReservationsPage } from "./pages/ReservationsPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
