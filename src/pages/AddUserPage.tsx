import React from "react";
import { User } from "../types/User";
import UserForm from "../components/UserForm";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AddUserPageProps {
  addUser: (user: User) => void;
}

const AddUserPage: React.FC<AddUserPageProps> = ({ addUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (user: User) => {
    addUser(user);
    navigate("/users"); // Redirect to users page after adding
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New User
      </Typography>
      <UserForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddUserPage;
