import { Options } from "k6/options";
import { User } from "../types/user.type";
import * as fake from "faker";
import * as user from "../controller/user.register";
import * as auth from "../controller/user.auth";
import {getCrocodiles, prepareCrocodiles} from "../controller/my.crocodiles";
import * as rate from "../utils/metrics";

export const options: Partial<Options> = {
  scenarios: {
    get_with_size_15: {
      executor: "per-vu-iterations",
      iterations: 100,
      vus: 30,
      env: { OFFSET: "10" },
      maxDuration: "1m",
      gracefulStop: "5s",
      exec: "searchCrocodiles",
    },
    get_with_size_30: {
      executor: "per-vu-iterations",
      iterations: 100,
      vus: 30,
      env: { OFFSET: "30" },
      maxDuration: "1m",
      gracefulStop: "5s",
      exec: "searchCrocodiles",
    },
  },
  thresholds: {
    errors_rate: ["rate <= 0.1"],
    "http_req_duration{scenario:get_with_size_15}": [
      "p(80)<3000",
      "p(15)<5000",
      "p(5)<8000",
    ],
    "http_req_duration{scenario:get_with_size_30}": [
      "p(80)<3000",
      "p(15)<5000",
      "p(5)<8000",
    ],
  },
  discardResponseBodies: false,
};

export function setup(): string {
  const userPayload: User = {
    username: fake.internet.userName(),
    first_name: fake.name.firstName(),
    last_name: fake.name.lastName(),
    email: fake.internet.email(),
    password: fake.internet.password(),
  };

  user.register(userPayload);
  const token = auth.getAuth(userPayload);
  prepareCrocodiles(token, 50)
  return token
}

export function searchCrocodiles(_token: string): void {
  getCrocodiles(_token, (response) => {
    rate.p80_within_1sec(response);
    rate.errors(response, 200);
  });
}
