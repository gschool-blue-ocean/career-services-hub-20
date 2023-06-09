import React, { useState, useEffect } from "react";
import "./loginPage.css";
import galvanizeLogo from "./galvanizeLogo.webp";

const LogInPage = ({ handleLogin,setIsStudent,isStudent }) => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorRelay, setErrorRelay] = useState("");
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    //if (isStudent)  document.body.classList = 'student-background'
    const timer = setTimeout(() => setOpacity(1), 100); // delay to let the DOM update
    return () => clearTimeout(timer); // cleanup timer on unmount
  }, []);

  // switch between localhost8000 or your deployed site, hard coded career-services for now.
  const url = 'http://localhost:8000';



  async function loginUser(email, password) {
    try {
      const cookies = document.cookie.split(";");
      const found = cookies.find(element=> element.trim().startsWith('jwt=')) //looks into cookies if it is a jwt token
      const response = await fetch(`${url}/managers/login`, {
        method: "POST",
        
        headers: {
          "Content-Type": "application/json",
          Authorization:(found?found.split('jwt=')[1]:null),
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      const responseData = await response.json();

      if (!response.ok)
      {
        throw new Error('Invalid email or password');
      }
        
      else if (responseData) {
        const timeExpire = 1000* 60 * 15;
        console.log(timeExpire)
        console.log(responseData.token);
        document.cookie = `jwt=${responseData.token}; expires=${new Date(Date.now() + timeExpire).toUTCString()}; path=/; SameSite=Strict;`;
        handleLogin(true); // Call the handleLogin function passed as a prop
        
      } else {
        setErrorRelay("Something has gone horribly wrong 😢");
      }
   }
   catch (error) {
     setErrorRelay("Get out of here imposter 😠");
   }
  }

  // Upon submit email and password is passed into the Log in user function
  const toggle = ()=>{
    console.error(isStudent);
    if (isStudent)
    {
      setIsStudent(false);
      document.body.classList.remove('student-background');
    }
    else
    {
      setIsStudent(true);
      document.body.classList.add('student-background');
    }
  }
  const handleUserLogin = (e) => {
    e.preventDefault();

    // Check if both email and password fields are not empty
    if (email === "" || pass === "") {
      setErrorRelay("Please fill in both email and password fields 🤦");
    } else {
      loginUser(email, pass);
      setErrorRelay("Logging in...");
    }
  };

  return (
    <div style={{ opacity: opacity, transition: "opacity 2s" }}>
      <div className="login-background">
        <button className='login-student' onClick={()=>toggle()}>{isStudent?'login as Admin':'Login as Student'}</button>
        <form className="login-Container" onSubmit={handleUserLogin}>
          <img src={galvanizeLogo}></img>
          <input
            className="login-value"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="YourEmail@galvanize.com"
            id="email"
          ></input>
          <input
            className="login-value"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="*******"
            id="password"
          ></input>
          <button className="login-button">Log In</button>
          {errorRelay ? (
            <p className="error-message">{errorRelay}</p>
          ) : (
            <p className="easter-egg">🌮</p>
          )}
        </form>
      </div>
    </div>
  );
};
export default LogInPage;
