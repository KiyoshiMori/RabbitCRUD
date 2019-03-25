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

export const deleteRabbit = async input => {
	const { id, name, weight, token } = input;

	return await request({
		uri: `/rabbit/${id}`,
		method: 'DELETE',
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
