import {Rate} from "k6/metrics";
import {RefinedResponse} from "k6/http";

const P80 = new Rate("p80_within_3sec");

export function p80_within_1sec(response: RefinedResponse<any>): void {
  P80.add(response.timings.duration < 1000);
}
