import { useState } from "react";

export default function EventList({ events, onSelect }) {
  const [expanded, setExpanded] = useState(null);

  if (!events || events.length === 0) {
    return <div style={{ padding: 20 }}>No events yet</div>;
  }

  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: 10 }}>
      <h3>Events</h3>

      {events.map(e => (
        <div key={e.id} style={{ marginBottom: 6 }}>

          {/* BASE ROW */}
          <button
            onClick={() => setExpanded(expanded === e.id ? null : e.id)}
            style={{
              width: "100%",
              border: "none",
              background: "#f5f5f5",
              padding: "6px",
              textAlign: "left",
              cursor: "pointer"
            }}
          >
            {e.kind} — {new Date(e.occurred_at).toLocaleTimeString()}
          </button>

          {/* EXPANDED ROW */}
          {expanded === e.id && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 60px 60px",
                padding: "6px",
                background: "white",
                border: "1px solid #eee"
              }}
            >
              <div>{e.method}</div>
              <div>{e.path}</div>
              <div>{e.status}</div>
              <div>{e.duration_ms}ms</div>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}