import React, { useEffect, useState } from "react";
import TodoContainer from "./components/TodoContainer";
import Login from "./components/Login";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isLoggedIn = !!loggedInUser;

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user && user !== "null") {
      try {
        setLoggedInUser(JSON.parse(user));
      } catch (error) {
        console.error("Error parsing logged in user from localStorage:", error);
        localStorage.removeItem("loggedInUser");
      }
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="welcome-header">
            <span>
              Welcome, <h2> {loggedInUser.fullname}</h2>
            </span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <TodoContainer user={loggedInUser} />
        </div>
      ) : (
        <Login handleLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
