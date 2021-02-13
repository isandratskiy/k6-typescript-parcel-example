import { Rate } from "k6/metrics";
import { RefinedResponse } from "k6/http";

const P80 = new Rate("p80_within_1sec");
const ERRORS_RATE = new Rate("errors_rate")

export function p80_within_1sec(response: RefinedResponse<any>): void {
  P80.add(response.timings.duration < 1000);
}

export function errors(response: RefinedResponse<any>): void {
  ERRORS_RATE.add(response.status !== 201);
}
