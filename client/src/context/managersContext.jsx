import React, { useState, useEffect, createContext } from "react";

export const ManagersContext = createContext();

export function ManagersContextProvider({ children,loggedInfo }) {
  //Create managersData state and give it a single fake manager at the start
  const [managersData, setManagersData] = useState([
    {
      login_id: "Antonetta_Dooley",
      tscm_avatar: "https://cdn.fakercloud.com/avatars/robbschiller_128.jpg",
      tscm_email: "Lorna62@gmail.com",
      tscm_first: "Jules",
      tscm_id: 1,
      tscm_last: "Waelchi",
      tscm_password: "oypEp16",
    },
  ]);

  // This allows the app to run in both development (locally) and deployed (on render)
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : "https://career-services-server.onrender.com";

  // Run once, until page is refreshed
  useEffect(() => {
    // Get latest managers data from SQL database
    if (loggedInfo) {
      fetch(`${url}/managers`)
      .then((response) => response.json())
      .then((data) => setManagersData(data))
      .catch((error) => console.log(error));
    }
    
  }, [loggedInfo]);

  return (
    <ManagersContext.Provider value={{ managersData }}>
      {children}
    </ManagersContext.Provider>
  );
}
