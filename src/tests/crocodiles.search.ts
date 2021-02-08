import http from "k6/http";
import { Options } from "k6/options";

export const options: Partial<Options> = {
  scenarios: {
    create: {
      executor: "per-vu-iterations",
      iterations: 15,
      env: { OFFSET: "10" },
      maxDuration: "1m",
      gracefulStop: "5s",
      exec: "getCrocodiles",
    },
    get_with_size_15: {
      executor: "per-vu-iterations",
      iterations: 15,
      env: { OFFSET: "15" },
      maxDuration: "1m",
      gracefulStop: "5s",
      exec: "getCrocodiles",
    },
  },
  thresholds: {
    "http_req_duration{scenario:get_with_size_1}": [
      "p(80)<3000",
      "p(15)<5000",
      "p(5)<8000",
    ],
    "http_req_duration{scenario:get_with_size_15}": [
      "p(80)<3000",
      "p(15)<5000",
      "p(5)<8000",
    ],
  },
  discardResponseBodies: true,
};

export function getCrocodiles() {
  http.get(`https://test-api.k6.io/public/crocodiles/${__ENV.OFFSET}`);
}
