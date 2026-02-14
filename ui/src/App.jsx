import { useEffect, useState } from "react";
import { fetchEvents, fetchEvent } from "./api";
import EventList from "./EventList";
import EventDetail from "./EventDetail";

export default function App() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  async function selectEvent(id) {
    const event = await fetchEvent(id);
    setSelected(event);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <EventList events={events} onSelect={selectEvent} />
      <EventDetail event={selected} />
    </div>
  );
}

// import { useEffect, useState } from "react";

// const API = "http://localhost:4000";

// export default function App() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     fetch(`${API}/events`)
//       .then(res => res.json())
//       .then(data => {
//         console.log("EVENTS FROM API:", data);
//         setEvents(data);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>EventLens</h1>

//       {events.map(e => (
//         <div key={e.id} style={{ marginBottom: 10 }}>
//           <strong>{e.event_type}</strong>
//           <div>Status: {e.processing_status}</div>
//         </div>
//       ))}
//     </div>
//   );
// }
