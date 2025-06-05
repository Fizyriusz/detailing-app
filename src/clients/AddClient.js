import React, { useState } from "react";
import { addClient } from "./clientService";

const initial = {
  name: "",
  phone: "",
  car: "",
  registration: "",
  visitDate: "",
  services: "",
};

export default function AddClient() {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addClient(form);
    setForm(initial);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Client</h2>
      {Object.keys(initial).map((k) => (
        <div key={k}>
          <label>
            {k}
            <input
              name={k}
              value={form[k]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit">Save</button>
    </form>
  );
}
