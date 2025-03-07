import { User } from "../types/types";

interface Props {
  users: User[];
  showColors: boolean;
  toggleDelete: (email: string) => void;
}

const UsersList = ({ users, showColors, toggleDelete }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Accciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.email}
            className={`${
              showColors
                ? index % 2 === 0
                  ? "table-bg-gray"
                  : "table-bg-white"
                : ""
            }`}
          >
            <td>
              <img src={user.picture.thumbnail} alt="imagen de perfil" />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => toggleDelete(user.email)}>Borrar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersList;
