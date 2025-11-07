// src/components/users/UsersList.jsx
import React from "react";
import UserCard from "./UsersCard";

const UsersList = ({ usuarios, onDelete, onChangeRol, onEdit }) => {
  if (!usuarios?.length)
    return <p className="text-gray-500 text-center">No hay usuarios registrados.</p>;

  return (
    <div className="space-y-3">
      {usuarios.map((u) => (
        <UserCard
          key={u._id}
          usuario={u}
          onDelete={() => onDelete(u)}
          onChangeRol={onChangeRol}
          onEdit={() => onEdit(u)}
        />
      ))}
    </div>
  );
};

export default UsersList;


