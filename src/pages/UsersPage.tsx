import React, { useState } from "react";
import { User } from "../types/User";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import SearchBar from "../components/SearchBar";
import {
  Container,
  Typography,
  Modal,
  Box,
  Button,
  Paper,
} from "@mui/material";

interface UsersPageProps {
  users: User[];
  addUser: (user: User) => void;
  addUsers: (users: User[]) => void;
  editUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

const UsersPage: React.FC<UsersPageProps> = ({
  users,
  addUser,
  addUsers,
  editUser,
  deleteUser,
}) => {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddClick = () => {
    setEditingUser(null);
    setOpenModal(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  const handleSubmit = (user: User) => {
    if (editingUser) {
      editUser(user);
    } else {
      addUser(user);
    }
    setOpenModal(false);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container
      maxWidth={false}
      sx={{ mt: 5, display: "flex", justifyContent: "flex-end" }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          width: "100%",
          minWidth: 400,
          mr: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Users Dashboard
        </Typography>

        {/* Search + Add Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <SearchBar search={search} setSearch={setSearch} />
          <Button variant="contained" color="primary" onClick={handleAddClick}>
            Add User
          </Button>
        </Box>

        {/* User Table */}
        <UserList
          users={filteredUsers}
          onEdit={handleEditClick}
          onDelete={deleteUser}
        />

        {/* Add/Edit Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            p={4}
            bgcolor="background.paper"
            borderRadius={3}
            boxShadow={6}
            sx={{
              width: { xs: "90%", sm: 400 },
              margin: "10% auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <UserForm user={editingUser || undefined} onSubmit={handleSubmit} />
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
};

export default UsersPage;
