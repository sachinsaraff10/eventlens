export default function EventDetail({ event }) {
  if (!event) {
    return <div style={{ padding: 20 }}>Select an event</div>;
  }

  return (
    <div style={{ padding: 20, width: "70%" }}>
      <h3>{event.method} {event.path}</h3>

      <p>Status: {event.status}</p>
      <p>Duration: {event.duration_ms} ms</p>
      <p>Source: {event.source}</p>

      <h4>Payload</h4>
      <pre>{JSON.stringify(event.payload, null, 2)}</pre>
    </div>
  );
}