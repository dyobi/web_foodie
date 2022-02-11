const data = {
	id: -1,
	userId: '',
	userName: '',
	userTel: ''
};

const reducer = (state = data, action) => {
	switch (action.type) {
		case 'USER_DATA':
			return Object.assign({}, state, {
				id: action.payload.id,
				userId: action.payload.userId,
				userName: action.payload.userName,
				userTel: action.payload.userTel
			});
		default:
			return state;
	}
};

export default reducer;