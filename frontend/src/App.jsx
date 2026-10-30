
import { useState } from "react";
import "./App.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "/api/users/login"
        : "/api/users/signup";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      if (isLogin) {
        setCurrentUser(data.user);
        setMessage("");
      } else {
        setIsLogin(true);
        setName("");
        setPassword("");
        setMessage("Signup successful! Please log in.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setCurrentUser(null);
    setPassword("");
    setMessage("You have logged out successfully.");
  }

  if (currentUser) {
    return (
      <div className="container">
        <h1>Dashboard</h1>

        <h2>Welcome, {currentUser.name}!</h2>

        <p>You are logged in successfully.</p>

        <p>Email: {currentUser.email}</p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{isLogin ? "Login" : "Create Account"}</h1>

      <p>
        {isLogin
          ? "Welcome back! Login to continue."
          : "Sign up to get started."}
      </p>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isLogin
              ? "Login"
              : "Sign Up"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p>
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          className="switch-button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
            setPassword("");
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default App;
