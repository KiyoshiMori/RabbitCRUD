import rp from 'request-promise';

export default async (options) => {
	const { method, uri, contentType, headers, ...rest } = options;

	const response = await rp({
		method: method || 'GET',
		uri: `http://conquest.weekendads.ru${uri}`,
		headers: {
			...headers,
			"Content-Type": contentType || 'application/json',
		},
		...rest,
	});

	console.log({ response });

	return response;
};
