import React, { useEffect, useState } from "react";
import { getClients, deleteClient } from "./clientService";

export default function ClientsList() {
  const [clients, setClients] = useState([]);

  const load = async () => {
    const data = await getClients();
    setClients(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteClient(id);
    load();
  };

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {clients.map((c) => (
          <li key={c.id}>
            {c.name} - {c.car} - {c.phone}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
