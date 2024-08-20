import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/user/register", {
        name,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary mt-2">Register</button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link to="/login" className="underline text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
