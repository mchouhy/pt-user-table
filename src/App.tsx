import { useEffect, useState } from "react";
import "./App.css";
import { UsersApiResults, type User } from "./types/types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data: UsersApiResults) => {
        setUsers(data.results);
      })
      .catch((error) => {
        console.error("Error en la petición de users", error);
      });
  }, []);
  return (
    <>
      <main>
        <h1>Prueba Técnica con Typescript y React:</h1>
        <table width="100%">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>
                  <img src={user.picture.thumbnail} alt="imagen de perfil" />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;
