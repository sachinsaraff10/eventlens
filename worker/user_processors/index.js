import { processLeaveRequest } from "./leave_events.js";
import { processJobFailure } from "./job_events.js";

export const processors = {
  leave_request_submitted: processLeaveRequest,
  job_failed: processJobFailure
};
