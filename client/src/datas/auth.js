import Axios from 'axios';

/* ----------------------------------------------------- */

/*
    method: 
        GET
    url: 
        /api/auth/userId/:userId
    parameter: 
        null
    result:
        status:
			200: doesn't exist
			400: exists
    using at:
        signup
*/
export const getUserName = (userId, cb) => {

    const url = `/api/auth/userId/${userId}`;

    Axios.get(url)
        .then(res => {
            cb(res.data);
        })
        .catch(() => {
            cb(0);
        });
};

/* ----------------------------------------------------- */

/*
	method: 
		POST
	url: 
		/api/auth/signin
	parameter: 
		userName, password
	result:
		status:
			200: success
			400: failure
		obj:
			user
	using at:
		signin
*/
export const signin = (userId, password, cb) => {

	const url = '/api/auth/signin';
	const data = {
		userId,
		password
	};

	Axios.post(url, data)
		.then(res => {
			cb(res.data);
		})
		.catch(() => {
			cb(0);
		});
};

/* ----------------------------------------------------- */

/*
	method: 
		POST
	url: 
		/api/auth/signup
	parameter: 
		userId, password, userName, userTel
	result:
		status:
			200: success
			400: failure
		obj:
			none
	using at:
		signup
*/
export const signup = (userId, password, userName, userTel, cb) => {

	const url = '/api/auth/signup';
	const data = {
		userId,
		password,
		userName,
		userTel
	};

	Axios.post(url, data)
		.then(res => {
			cb(res.data);
		})
		.catch(() => {
			cb({
				status: 400
			});
		});
};

/* ----------------------------------------------------- */

/*
	method: 
		PUT
	url: 
		/api/auth
	parameter: 
		userId, password, userName, userTel
	result:
		status:
			200: success
			400: failure
		obj:
			user
	using at:
		mypage
*/
export const putUser = (userId, password, userName, userTel, cb) => {

	const url = '/api/auth/';
	const data = {
		userId,
		password,
		userName,
		userTel
	};

	Axios.put(url, data)
		.then(res => {
			cb(res.data);
		})
		.catch(() => {
			cb({
				status: 400
			});
		});
}

/* ----------------------------------------------------- */

/*
	method: 
		DELETE
	url: 
		/api/auth
	parameter: 
		userId
	result:
		status:
			200: success
			400: failure
		obj:
			user
	using at:
		mypage
*/
export const deleteUser = (userId, cb) => {

	const url = '/api/auth/';
	const data = {
		userId
	};

	Axios.delete(url, {params: data})
		.then(res => {
			cb(res.data);
		})
		.catch(() => {
			cb({
				status: 400
			});
		});
}

/* ----------------------------------------------------- */
