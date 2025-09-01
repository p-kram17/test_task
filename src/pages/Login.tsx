import { FormEvent, useState } from "react";
import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { login, User } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    const storedUsers: User[] = JSON.parse(
      localStorage.getItem("users") || "[]"
    );
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("User not found or incorrect password");
      return;
    }

    dispatch(login(foundUser));
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    navigate("/");
  };

  return (
    <div className={styles.login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Continue</button>
      </form>
      <p className={styles.bottomText}>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
