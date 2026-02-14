export default function EventList({ events, onSelect }) {
  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <h3>Events</h3>
      <ul>
        {events.map(e => (
          <li key={e.event_id}>
            <button onClick={() => onSelect(e.event_id)}>
              {e.event_type} – {new Date(e.occurred_at).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
