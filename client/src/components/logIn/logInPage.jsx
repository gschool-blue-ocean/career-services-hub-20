import React, { useState, useEffect } from "react";
import './loginPage.css'
import galvanizeLogo from './galvanizeLogo.webp'

const LogInPage = ({ handleLogin }) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorRelay, setErrorRelay] = useState("");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 100); // delay to let the DOM update
    return () => clearTimeout(timer); // cleanup timer on unmount
  }, []);

  async function loginUser(email, password) {
    try {
      const response = await fetch("https://career-services-server.onrender.com/managers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const responseData = await response.json();


      if (responseData.success) {
        localStorage.setItem('authToken', responseData.accessToken);
        handleLogin(responseData.accessToken); // Call the handleLogin function passed as a prop
        
      } else {
        setErrorRelay(responseData.message);
      }
    }
    catch (error) {
      setErrorRelay("Get out of here imposter 😠");
    }
  }

  // Upon submit email and password is passed into the Log in user function

  const handleUserLogin = (e) => {
    e.preventDefault();
  
    // Check if both email and password fields are not empty
    if (email === "" || pass === "") {
      setErrorRelay("Please fill in both email and password fields 🤦"); 
    } else {
      loginUser(email, pass);
      setErrorRelay('Logging in...')
    }
  };

  return (
    <div style={{ opacity: opacity, transition: 'opacity 2s' }}>
      <div className="login-background">
        <form className="login-Container" onSubmit={handleUserLogin}>
        <img src={galvanizeLogo} ></img>
          <input
            className="login-value"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="YourEmail@galvanize.com"
            id="email">
          </input>
          <input
            className="login-value"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="*******"
            id="password"
          ></input>
          <button className="login-button">Log In</button>
          {errorRelay ? <p className="error-message">{errorRelay}</p> : <p className="easter-egg">🌮</p>} 
        </form>
      </div>
    </div>
  );
}
export default LogInPage;