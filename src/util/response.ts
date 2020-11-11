const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': process.env.ALLOW_ORIGIN_CORS,
	'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
	'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PATCH, PUT',
};

export default {
	success: (body) => {
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify(body),
		};
	},
	error: (error) => {
		console.error(error);
		return {
			headers,
			statusCode: 500,
			body: JSON.stringify(error),
		}
	}
};