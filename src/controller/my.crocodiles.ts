import * as request from "../utils/request";
import { K6Interceptor } from "../utils/request";
import { sleep } from "k6";
import { Crocodile } from "../types/crocodile.type";

const CROCODILES_ENDPOINT = "my/crocodiles/";

export function createCrocodiles(
  token: string,
  crocodile: Crocodile,
  interceptor?: K6Interceptor
): Crocodile {
  const headers = request.headers(token);
  const response = request.post<Crocodile>(
    CROCODILES_ENDPOINT,
    crocodile,
    headers,
    interceptor
  );

  sleep(0.3);
  return response;
}
