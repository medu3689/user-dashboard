// src/components/UserList.tsx
import React from "react";
import { User } from "../types/User"; // correct path to your User type
import UserTable from "./table/UserTable";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

// This component simply wraps UserTable
const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return <UserTable users={users} onEdit={onEdit} onDelete={onDelete} />;
};

export default UserList;
