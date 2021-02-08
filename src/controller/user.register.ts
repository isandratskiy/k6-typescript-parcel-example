import { sleep } from "k6";
import * as request from "../utils/request";
import { K6Interceptor } from "../utils/request";
import { User } from "../types/user.type";

const REGISTER_ENDPOINT = "user/register/";

export function register(user: User, interceptor?: K6Interceptor): void {
  const headers = request.headers();
  request.post(REGISTER_ENDPOINT, user, headers, interceptor);
  sleep(0.3);
}
