export default function EventDetail({ event }) {
  if (!event) {
    // return <div style={{ 
    // padding: 20 }}>Select an event</div>;
  }

  return (
    <div style={{ padding: 20, width: "70%" }}>
      <h3>{event.kind}</h3>

      <h4>Raw Payload</h4>
      <pre>{JSON.stringify(event.payload, null, 2)}</pre>

      {/* <h4>Processed Payload</h4>
      <pre>{JSON.stringify(event.processed_payload, null, 2)}</pre> */}
    </div>
  );
}
