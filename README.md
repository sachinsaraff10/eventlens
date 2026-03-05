# EventLens

**EventLens** is a lightweight developer tool that captures application events (such as HTTP requests) and renders them in a simple UI for inspection.

It works by installing a small middleware in your application that passively observes events and sends them to the EventLens API, where they are stored and visualized.

The goal is to provide a simple way to inspect application behavior without adding manual logging or instrumentation.

---

# What Problem It Solves

When debugging applications, developers often rely on:

* console logs
* scattered logs across services
* ad-hoc debugging

This makes it difficult to see **what actually happened in the system**.

EventLens provides a centralized event stream where developers can view:

* incoming HTTP requests
* response status codes
* request duration
* event payloads
* event timelines

All in one place.

---

# Architecture Overview

EventLens has three main components:

```
User Application
      │
      ▼
EventLens Middleware
(passively observes events)
      │
      ▼
EventLens API
(event ingestion + storage)
      │
      ▼
PostgreSQL
(event storage)
      │
      ▼
EventLens UI
(event visualization)
```

Flow of data:

```
HTTP request
      │
      ▼
Middleware captures event
      │
      ▼
POST /events → EventLens API
      │
      ▼
Stored in Postgres
      │
      ▼
Rendered in UI
```

---

# Repository Structure

```
eventlens/

api/           Event ingestion API
ui/            React UI for viewing events
packages/
  express/     Express middleware SDK
db/            Database schema and migrations
dev/
  host/        Local test harness
docker-compose.yml
```

---

# Running EventLens Locally

EventLens uses Docker to run the full stack.

### Start the stack

```
docker compose up
```

This launches:

* Postgres
* Redis
* EventLens API
* EventLens UI

### Open the UI

```
http://localhost:5173
```

---

# Testing Event Capture

A test host app is included in:

```
dev/host
```

Start it:

```
node dev/host/server.js
```

Send requests:

```
curl http://localhost:3001/ok
curl http://localhost:3001/error
curl http://localhost:3001/slow
```

These requests will appear in the EventLens UI.

---

# Installing EventLens in Your App

Install the middleware package.

```
npm install eventlens-express
```

Add it to your Express app:

```
import express from "express"
import { eventLensMiddleware } from "eventlens-express"

const app = express()

app.use(
  eventLensMiddleware({
    endpoint: "http://localhost:4000",
    source: "my-app"
  })
)

app.listen(3000)
```

The middleware will automatically emit events for each request.

---

# Example Captured Event

```
{
  "kind": "http.request",
  "source": "my-app",
  "payload": {
    "method": "GET",
    "path": "/users",
    "status": 200,
    "duration_ms": 32
  }
}
```

---

# Event Schema

Events are stored in the `events_raw` table.

| Column      | Description      |
| ----------- | ---------------- |
| id          | event identifier |
| kind        | event type       |
| source      | emitting service |
| payload     | event metadata   |
| occurred_at | event timestamp  |

---

# Development

### Run services

```
docker compose up
```

### Rebuild containers

```
docker compose build
```

### Restart API

```
docker compose restart api
```

---

# Future Improvements

Possible future directions:

* event filtering
* service tracing
* distributed tracing
* search and indexing
* alerting

---

# License

MIT
