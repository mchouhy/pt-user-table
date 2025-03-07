import { useEffect, useRef, useState } from "react";
import "./App.css";
import { UsersApiResults, type User } from "./types/types";
import UsersList from "./components/users-list";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const usersInitialState = useRef<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sort, setSort] = useState(false);
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
        usersInitialState.current = data.results;
      })
      .catch((error) => {
        console.error("Error en la petición de users", error);
      });
  }, []);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSort = () => {
    setSort((prevState) => !prevState);
  };

  const sortedUsers = sort
    ? [...users].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users;

  const toggleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const toggleReset = () => {
    setUsers(usersInitialState.current);
  };

  return (
    <>
      <h1>Prueba Técnica React/Typescript:</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSort}>
          {sort ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button onClick={toggleReset}>Resetear usuarios</button>
      </header>
      <main>
        <UsersList
          users={sortedUsers}
          showColors={showColors}
          toggleDelete={toggleDelete}
        />
      </main>
    </>
  );
}

export default App;
