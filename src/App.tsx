import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage";
import { User } from "./types/User";
import Sidebar from "./components/Sidebar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#1976d2" },
        },
      }),
    [darkMode]
  );

  // Add, edit, delete functions
  const addUser = (user: User) => setUsers((prev) => [...prev, user]);
  const addUsers = (newUsers: User[]) => setUsers(newUsers);
  const editUser = (updatedUser: User) =>
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  const deleteUser = (id: number) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  // ✅ Fetch users
  useEffect(() => {
    if (users.length === 0) {
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const usersWithRoles: User[] = res.data.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: ["Admin", "User", "Manager"][
              Math.floor(Math.random() * 3)
            ] as User["role"],
          }));
          addUsers(usersWithRoles);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex" }}>
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route
                path="/users"
                element={
                  <UsersPage
                    users={users}
                    addUser={addUser}
                    addUsers={addUsers}
                    editUser={editUser}
                    deleteUser={deleteUser}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
