import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <TextField
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by name or email"
      size="small"
      variant="outlined"
      sx={{ width: 300 }}
    />
  );
};

export default SearchBar;
