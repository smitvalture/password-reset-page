import { Routes, Route } from "react-router-dom";
import PasswordResetPage from "./pages/PasswordResetPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PasswordResetPage />} />
    </Routes>
  );
}

export default App;
