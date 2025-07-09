import { Route, Routes } from "react-router";

import { HomePage } from "./pages/HomePage";
import { Layout } from "./pages/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
