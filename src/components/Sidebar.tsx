import React from "react";
import { Box, Typography } from "@mui/material";
import DarkModeToggle from "./DarkMode/DarkModeToggle";

interface SidebarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <Box
      sx={{
        width: 200,
        height: "125vh",
        bgcolor: "primary.main",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Menu
      </Typography>

      <Box sx={{ mt: 4 }}>
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Box>
    </Box>
  );
};

export default Sidebar;
