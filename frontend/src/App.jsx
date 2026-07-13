import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgotpass";
import PasswordResetPage from "./pages/auth/passreset";

import DashboardLayout from "./layouts/DashboardLayout";

import DashboardHome from "./pages/dashboard/DashboardHome";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

import ProtectedRoute from "./routes/protectedRoute";

import { getStoredToken } from "./utils/helpers";

const defaultRoute = getStoredToken()
  ? "/dashboard"
  : "/login";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={defaultRoute}
            replace
          />
        }
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPasswordPage />}
      />

      <Route
        path="/reset-password/:token"
        element={<PasswordResetPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardHome />}
          />

          <Route
            path="/dashboard/transactions"
            element={<TransactionsPage />}
          />

          <Route
            path="/dashboard/analytics"
            element={<AnalyticsPage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={
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