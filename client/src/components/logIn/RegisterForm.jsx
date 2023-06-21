import React,{useEffect, useState} from "react";
import galvanizeLogo from "./galvanizeLogo.webp";
import { useNavigate } from "react-router-dom";

function RegisterForm({url}){
    
    const [email, setEmail] = useState("");
    const [errorRelay, setErrorRelay] = useState("");
    const [pass, setPass] = useState("");
    const [confirmpass,setConfirmpass] = useState('');
    const [first,setFirst] = useState('');
    const [last,setLast] = useState('');
    const [opacity,setOpacity] = useState(0);
    const nav = useNavigate();
    const form = {
        email,pass,confirmpass,first,last
    }
    // switch between localhost8000 or your deployed site, hard coded career-services for now.
    useEffect(()=>{
        setOpacity(1)
    },[opacity])

    
    
    const register = ()=>{
        console.log('reached')
        const fetchData = async() =>{
            const response = await fetch(`${url}/students`,{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    first,
                    last,
                    email,
                    pass
                })
            });
            


      if (!response.ok) throw new Error("registry falled");
      else {
        const result = await response.json();
        console.log(result);
      }
    };
    fetchData();
  };
    const handleUserRegister = (e) => {
        e.preventDefault();
        // Check if both email and password fields are not empty
        let formValues = Object.values(form);
        let emptyValues =formValues.filter((element)=>element === "")
        console.log(emptyValues)
        if (emptyValues.length!== 0) {
          setErrorRelay("Please fill in all Forms 🤦");
        } 
        else if (pass !== confirmpass)
        {
            setErrorRelay("Password and confirm password are not the Same 🤦")
        } 
        else {
          register();
          setErrorRelay("Registered");
        }
      };
    return (
        <div className="register-background">
            <div style={{ opacity: opacity, transition: "opacity 2s" }}>
            <div className='login-nav-background'>
            <nav className='login-nav'>
            <button className='register-student' onClick={()=>{nav('/login')}}>Login</button>
            </nav>
            </div>
        
            <div className="register-container">
                
                <form className="register-form" onSubmit={handleUserRegister}>
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
                    placeholder="password"
                    id="password"
                ></input>
                <input
                    className="login-value"
                    value={confirmpass}
                    onChange={(e) => setConfirmpass(e.target.value)}
                    type="password"
                    placeholder="Confirm password"
                    id="confirmPass"
                ></input>
                <input
                    className="login-value"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    type="text"
                    placeholder="firstname"
                    id="firstname"
                ></input>
                <input
                    className="login-value"
                    value={last}
                    onChange={(e) => setLast(e.target.value)}
                    type="text"
                    placeholder="lastname"
                    id="lastname"
                ></input>
                
                <button className="login-button">Register</button>
                {errorRelay ? (
                    <p className="error-message">{errorRelay}</p>
                ) : (
                    <p className="easter-egg">🌮</p>
                )}
                </form>
            </div>
            </div>
        </div>
    );
}
export default RegisterForm;
