import * as request from "../utils/request";
import { K6Interceptor } from "../utils/request";
import { sleep } from "k6";
import { AuthRequest, AuthResponse } from "../types/user.type";

const AUTH_ENDPOINT = "auth/token/login/";

export function login(
  authUser: AuthRequest,
  interceptor?: K6Interceptor
): void {
  const headers = request.headers();
  request.post(AUTH_ENDPOINT, authUser, headers, interceptor);
  sleep(0.3);
}

export function getAuth({
  username,
  password,
}: {
  username: string;
  password: string;
}): string {
  const headers = request.headers();
  return request.post<AuthResponse>(
    AUTH_ENDPOINT,
    { username, password },
    headers
  ).access;
}
