import React, { useState, useEffect, createContext } from "react";

export const EventsContext = createContext();

export function EventsContextProvider({ children, loggedInfo, url }) {
  //Create eventData state and give it a single fake event at the start
  const [eventsData, setEventsData] = useState([
    {
      event_id: 1,
      event_date: "2023-05-10T00:00:00.000Z",
      event_descrip:
        "Sed repellat rerum hic. Perspiciatis quas magni. Amet quibusdam doloremque aliquid et reiciendis et ut. Soluta et ad enim dolor nihil accusantium. Voluptas odit earum.",
      event_name: "Roberts Inc",
      event_time: "2077-01-04T00:00:00.000Z",
      speak_con: "yes",
      tscm_id: 4,
      tscm_first: "Delia",
      tscm_last: "Denesik",
    },
  ]);

  // This allows the app to run in both development (locally) and deployed (on render)

  // Run once, until page is refreshed
  useEffect(() => {
    // Get latest events data from SQL database
    if (loggedInfo) {
      fetch(`${url}/events`)
        .then((response) => response.json())
        .then((data) => setEventsData(data))
        .catch((error) => console.log(error));
    }
  }, [loggedInfo]);

  return (
    <EventsContext.Provider value={{ eventsData }}>
      {children}
    </EventsContext.Provider>
  );
}
