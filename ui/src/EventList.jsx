export default function EventList({ events, onSelect }) {
  return (
    <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
      <h3>Events</h3>
      <ul>
        {events.map(e => (
          <li key={e.id}>
            <button onClick={() => onSelect(e.id)}>
              {e.kind} – {new Date(e.occurred_at).toLocaleString()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
