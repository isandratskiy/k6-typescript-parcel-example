import http, { RefinedResponse } from 'k6/http'

const BASE_URL = 'https://test-api.k6.io'

export type K6Interceptor = (res: RefinedResponse<'text'>) => void

export function headers(authToken?: string): any {
	return {
		headers: {
			'Content-Type': 'application/json',
			...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
		}
	}
}

export function post<T>(
	_url: string,
	body: any,
	headers: any,
	interceptor?: K6Interceptor
): T {
	const url = `${BASE_URL}/${_url}`
	const response: RefinedResponse<'text'> = http.post(
		url,
		JSON.stringify(body),
		headers
	)

	return responseAs<T>(response, url, interceptor)
}

export function get<T>(
	_url: string,
	headers: any,
	interceptor?: K6Interceptor
): T {
	const url = `${BASE_URL}/${_url}`
	const response: RefinedResponse<'text'> = http.get(url, headers)

	return responseAs<T>(response, url, interceptor)
}

export function responseAs<T>(
	res: RefinedResponse<'text'>,
	url: string,
	interceptor?: K6Interceptor
): T {
	if (res.error) console.log(`UNKNOWN ERROR ON REQUEST : ${res.error}`)

	if (res.error_code) {
		// @ts-ignore
		const statusText = res.status_text
		console.log(`REQUEST : ${url}\nFAILED: ${statusText}: ${res.body}`)
	}

	if (interceptor) interceptor(res)

	return JSON.parse(res.body)
}
