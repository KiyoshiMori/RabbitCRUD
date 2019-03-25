import request from './request';

export const login = async input => {
	console.log(`Login, ${input.username}`);
	const { login, password } = input;

	return await request({
		uri: '/login_check',
		method: 'POST',
		body: {
			username: login,
			password,
		},
		json: true,
	});
};

export const getRabbits = async input => {
	const { token } = input;

	return await request({
		uri: '/rabbit/list',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		json: true,
	});
};

export const rabbitCUD = async (input, type) => {
	const { id, name, weight, token } = input;

	const method = type === 'delete' ? 'DELETE' : 'POST';
	const linkEnd = type === 'create' ? '' : `/${id}`;

	return await request({
		uri: `/rabbit${linkEnd}`,
		method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		contentType: 'application/x-www-form-urlencoded',
		formData: {
			"rabbit[name]": name,
			"rabbit[weight]": Number(weight),
		},
		json: true,
	});
};