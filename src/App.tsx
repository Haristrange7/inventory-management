import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/MainLayout';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { DataManagementOverview } from './pages/DataManagementOverview';
import { DataManagementAnalytics } from './pages/DataManagementAnalytics';
import { UserTableAllUsers } from './pages/UserTableAllUsers';
import { UserTableInactive } from './pages/UserTableInactive';
import { AdminTableAdmins } from './pages/AdminTableAdmins';
import { AdminTablePermissions } from './pages/AdminTablePermissions';
import { Settings } from './pages/Settings';
import { useEffect } from 'react';
import { useThemeStore } from './store/themeStore';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />

          <Route path="data-management">
            <Route path="overview" element={<DataManagementOverview />} />
            <Route path="analytics" element={<DataManagementAnalytics />} />
          </Route>

          <Route path="user-table">
            <Route path="all-users" element={<UserTableAllUsers />} />
            <Route path="inactive" element={<UserTableInactive />} />
          </Route>

          <Route path="admin-table">
            <Route path="admins" element={<AdminTableAdmins />} />
            <Route path="permissions" element={<AdminTablePermissions />} />
          </Route>

          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
