import React from "react";
import { Box, Typography, Switch } from "@mui/material";

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2">Dark Mode</Typography>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
    </Box>
  );
};

export default DarkModeToggle;
