import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgotpass";
import PasswordResetPage from "./pages/auth/passreset";

import DashboardLayout from "./layout/dashboardLayout";

import DashboardHome from "./pages/dashboard/dashboardHome";
import TransactionsPage from "./pages/dashboard/transactionPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

import ProtectedRoute from "./routes/protectedRoute";

import { getStoredToken } from "./utils/helpers";

const defaultRoute = getStoredToken()
  ? "/dashboard"
  : "/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/login" element={<LoginPage />}
      />

      <Route
        path="/register" element={<RegisterPage />}
      />

      <Route
        path="/forgot-password" element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password/:token" element={<PasswordResetPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard" element={<DashboardHome />}
          />

          <Route
            path="/dashboard/transactions" element={<TransactionsPage />}
          />

          <Route
            path="/dashboard/analytics" element={<AnalyticsPage />}
          />
        </Route>
      </Route>

      <Route
        path="*" element={
          <Navigate
            to={defaultRoute}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;