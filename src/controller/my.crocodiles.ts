import * as request from '../utils/request';
import { K6Interceptor } from '../utils/request';
import { sleep } from 'k6';
import { Crocodile } from '../types/crocodile.type';
import fake from 'faker';

const CROCODILES_ENDPOINT = 'my/crocodiles/';

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

export function getCrocodiles(
	token: string,
	interceptor?: K6Interceptor
): Crocodile[] {
	const headers = request.headers(token);
	const response = request.get<Crocodile[]>(
		CROCODILES_ENDPOINT,
		headers,
		interceptor
	);

	sleep(0.3);
	return response;
}

export function prepareCrocodiles(token: string, count: number = 100): void {
	for (let i = 0; i < count; i++) {
		let crocodile: Crocodile = {
			name: fake.name.firstName(),
			sex: 'M',
			date_of_birth: '2020-10-15'
		};

		const headers = request.headers(token);
		request.post(CROCODILES_ENDPOINT, crocodile, headers);
		sleep(0.3);
	}
}
