import { FormEvent, useState } from "react";
import styles from "./Register.module.scss";
import { useDispatch } from "react-redux";
import { register, User } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9!@#$%^&*])(?=.{6,})/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters, include uppercase, lowercase and special character"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const namePart = email.split("@")[0];
    const helloEmail = `hello ${namePart}`;

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const exists = storedUsers.some((u) => u.email === email);

    if (exists) {
      setError("User with this email is already registered");
      return;
    }

    const newUser: User = { email, password };
    dispatch(register(newUser));

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    setEmail(helloEmail);
    setPassword("");
    navigate("/login");
  };

  return (
    <div className={styles.register}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
