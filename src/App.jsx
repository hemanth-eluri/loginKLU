import React, { useState } from "react";

function App() {
  const [activeForm, setActiveForm] = useState("login");
  const [registeredUser, setRegisteredUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [registration, setRegistration] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  function showForm(form) {
    setActiveForm(form);
    setLoginMessage("");
  }

  function handleLogin(event) {
    event.preventDefault();

    if (
      registeredUser &&
      loginEmail.trim().toLowerCase() === registeredUser.email.toLowerCase() &&
      loginPassword === registeredUser.password
    ) {
      setLoginMessage("Login Successful");
      return;
    }

    setLoginMessage(
      registeredUser
        ? "That email or password doesn't match."
        : "No account yet. Create one with the Register tab.",
    );
  }

  function handleRegistration(event) {
    event.preventDefault();
    setRegisteredUser({
      name: registration.name.trim(),
      email: registration.email.trim(),
      password: registration.password,
    });
    setRegistrationSubmitted(true);
  }

  function handleRegistrationChange(event) {
    const { name, value } = event.target;
    setRegistration((current) => ({ ...current, [name]: value }));
    setRegistrationSubmitted(false);
  }

  return (
    <main className="page">
      <section className="auth-card" aria-labelledby="page-title">
        <div className="brand-mark" aria-hidden="true">s</div>
        <p className="eyebrow">YOUR ACCOUNT</p>
        <h1 id="page-title">
          {activeForm === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="intro">
          {activeForm === "login"
            ? "Sign in to continue."
            : "A few details and you're all set."}
        </p>

        <div className="tabs" role="tablist" aria-label="Account options">
          <button
            type="button"
            role="tab"
            aria-selected={activeForm === "login"}
            className={activeForm === "login" ? "tab active" : "tab"}
            onClick={() => showForm("login")}
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeForm === "register"}
            className={activeForm === "register" ? "tab active" : "tab"}
            onClick={() => showForm("register")}
          >
            Register
          </button>
        </div>

        {activeForm === "login" ? (
          <form className="form" onSubmit={handleLogin}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(event) => {
                setLoginEmail(event.target.value);
                setLoginMessage("");
              }}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={loginPassword}
              onChange={(event) => {
                setLoginPassword(event.target.value);
                setLoginMessage("");
              }}
              required
            />

            <button className="submit-button" type="submit">Login</button>
            {loginMessage && (
              <p
                className={`feedback ${
                  loginMessage === "Login Successful" ? "success" : "error"
                }`}
                role="status"
              >
                {loginMessage}
              </p>
            )}
          </form>
        ) : (
          <form className="form" onSubmit={handleRegistration}>
            <label htmlFor="register-name">Full name</label>
            <input
              id="register-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={registration.name}
              onChange={handleRegistrationChange}
              required
            />

            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={registration.email}
              onChange={handleRegistrationChange}
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={registration.password}
              onChange={handleRegistrationChange}
              minLength={6}
              required
            />

            <button className="submit-button" type="submit">Create account</button>
            {registrationSubmitted && (
              <div className="registration-result" role="status">
                <p className="result-heading">Account created</p>
                <p><span>Name</span>{registeredUser.name}</p>
                <p><span>Email</span>{registeredUser.email}</p>
                <p className="password-note">Your password is saved for this session and is not displayed.</p>
              </div>
            )}
          </form>
        )}

        <p className="footnote">A simple demo. Your account is stored only for this session.</p>
      </section>
    </main>
  );
}

export default App;
