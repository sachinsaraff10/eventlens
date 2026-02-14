// user_processors/job_events.js

export function processJobFailure(rawEvent) {
  const payload = rawEvent.payload;

  return {
    job_name: payload.job.name,
    job_params: payload.job.params,
    error_message: payload.error.message,
    failure_type: "runtime"
  };
}