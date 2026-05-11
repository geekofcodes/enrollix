import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/registrations")
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>

      <button
        onClick={() =>
          window.open("http://localhost:5000/api/export", "_blank")
        }
      >
        Export CSV
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.phone}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}