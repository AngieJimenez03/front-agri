// src/components/users/UsersList.jsx
import React from "react";
import UserCard from "./UsersCard";

const UsersList = ({ usuarios, onDelete, onChangeRol }) => {
  if (!usuarios || usuarios.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10 text-lg font-medium">
        No hay usuarios disponibles
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {usuarios.map((usuario) => (
        <UserCard
          key={usuario._id}
          usuario={usuario}
          onDelete={onDelete}
          onChangeRol={onChangeRol}
        />
      ))}
    </div>
  );
};

export default UsersList;


