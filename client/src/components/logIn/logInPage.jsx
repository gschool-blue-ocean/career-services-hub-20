import React, { useState, useEffect } from "react";
import "./loginPage.css";
import galvanizeLogo from "./galvanizeLogo.webp";
import { useNavigate } from "react-router";

const LogInPage = ({
  setIsStudent,
  isStudent,
  setStudentInfo,
  setManagerInfo,
  setLoggedInfo,
  url,
}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorRelay, setErrorRelay] = useState("");
  const [opacity, setOpacity] = useState(0);

  const nav = useNavigate();

  useEffect(() => {
    //if (isStudent)  document.body.classList = 'student-background'
    const timer = setTimeout(() => setOpacity(1), 100); // delay to let the DOM update
    return () => clearTimeout(timer); // cleanup timer on unmount
  }, []);
  // switch between localhost8000 or your deployed site, hard coded career-services for now.

  const handleLogin = async (data) => {
    console.log("handle login reached");
    const cookies = document.cookie.split(";");
    const found = cookies.find((element) => element.trim().startsWith("jwt="));
    try {
      // if (isStudent) {
      //   const response = await fetch(`${url}/students/login/isAuthorized`, {
      //     method: "GET",

      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: found ? `Bearer ${found.split("jwt=")[1]}` : "",
      //     }, //student_email student_password\
      //   });
      //   const result = await response.json();
      //   setStudentInfo(result);
      //   console.log(result);
      // }
      setLoggedInfo(data);
      console.log(data);
    } catch (e) {
      setLoggedInfo(false);
      setStudentInfo({});
    } //fetches data, if no error set loggedInfo, else empty it.
  };

  async function loginUser(email, password) {
    try {
      const cookies = document.cookie.split(";");
      const found = cookies.find((element) =>
        element.trim().startsWith("jwt=")
      ); //looks into cookies if it is a jwt token
      const path = isStudent
        ? `${url}/students/login`
        : `${url}/managers/login`;
      const response = await fetch(path, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      const responseData = await response.json();
      if (!isStudent) {
        setManagerInfo(responseData.id);
      } else setStudentInfo({ message: { id: responseData.id } });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      } else if (responseData) {
        const timeExpire = 1000 * 60 * 15;
        console.log(timeExpire);
        console.log(responseData.token);
        document.cookie = `jwt=${responseData.token}; expires=${new Date(
          Date.now() + timeExpire
        ).toUTCString()}; path=/; SameSite=Strict;`;
        handleLogin(responseData); // Call the handleLogin function passed as a prop
        nav("/");
      } else {
        setErrorRelay("Something has gone horribly wrong 😢");
      }
    } catch (error) {
      setErrorRelay("Get out of here imposter 😠");
    }
  }

  // Upon submit email and password is passed into the Log in user function
  const toggle = () => {
    if (isStudent) {
      setIsStudent(false);
    } else {
      setIsStudent(true);
    }
  };

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
      <div className="login-nav-background">
        <nav className="login-nav">
          <button className="register-student" onClick={() => nav("/register")}>
            Register
          </button>
          <button className="login-student" onClick={() => toggle()}>
            {isStudent ? "Login as Admin" : "Login as Student"}
          </button>
        </nav>
      </div>

      <div className="login-background">
        <form className="login-Container" onSubmit={handleUserLogin}>
          <img
            className="login-logo"
            alt="logo"
            src={
              "https://www.galvanize.com/wp-content/uploads/2022/11/galvanize_logo_full-color_light-background.png"
            }
          ></img>
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
