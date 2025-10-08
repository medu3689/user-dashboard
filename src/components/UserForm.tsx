import React, { useState } from "react";
import { User } from "../types/User";
import { TextField, Button, MenuItem } from "@mui/material";
import { Container, Typography } from "@mui/material";
interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<User["role"]>(user?.role || "User");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Simple email regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      id: user?.id || Date.now(),
      name,
      email,
      role,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New User
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value as User["role"])}
      >
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="User">User</MenuItem>
        <MenuItem value="Manager">Manager</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};

export default UserForm;
