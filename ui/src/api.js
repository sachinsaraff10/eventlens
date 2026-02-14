const API_BASE = "http://localhost:4000";

export async function fetchEvents() {
  try {
    console.log("Calling fetchEvents");
    const res = await fetch(`${API_BASE}/events`);
    const data = await res.json();
    console.log("Fetched data:", data);
    return data;
  } catch (err) {
    console.error("fetchEvents failed:", err);
    throw err;
  }
}

export async function fetchEvent(id) {
  const res = await fetch(`${API_BASE}/events/${id}`);
  // console.log('fetched', res)
  return res.json();
}
