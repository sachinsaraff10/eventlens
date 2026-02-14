// user_processors/leave_events.js

export function processLeaveRequest(rawEvent) {
  const payload = rawEvent.payload;

  const start = new Date(payload.leave.start);
  const end = new Date(payload.leave.end);

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const daysRequested =
    Math.floor((end - start) / MS_PER_DAY) + 1;

  return {
    leave_type: payload.leave.type,
    start_date: payload.leave.start,
    end_date: payload.leave.end,
    days_requested: daysRequested,
    timezone: payload.timezone
  };
}
