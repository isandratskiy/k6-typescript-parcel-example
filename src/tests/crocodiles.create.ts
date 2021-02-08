import * as auth from "../controller/user.auth";
import * as user from "../controller/user.register";
import { Options } from "k6/options";
import * as fake from "faker";
import * as rate from "../utils/rates";
import { createCrocodiles } from "../controller/my.crocodiles";
import { Crocodile } from "../types/crocodile.type";
import { User } from "../types/user.type";

export const options: Partial<Options> = {
  vus: 30,
  iterations: 100,
};

export function setup() {
  const userPayload: User = {
    username: fake.internet.userName(),
    first_name: fake.name.firstName(),
    last_name: fake.name.lastName(),
    email: fake.internet.email(),
    password: fake.internet.password(),
  };

  user.register(userPayload);
  return auth.getAuth(userPayload);
}

export default function (_token: string): void {
  const crocodile: Crocodile = {
    name: fake.name.firstName(),
    sex: "M",
    date_of_birth: "2020-10-15",
  };

  createCrocodiles(_token, crocodile, (response) => {
    rate.p80_within_1sec(response);
  });
}
