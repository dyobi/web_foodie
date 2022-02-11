const data = {
	list: [],
	price: 0
};

const reducer = (state = data, action) => {
	switch (action.type) {
		case 'FOOD_LIST':
			return Object.assign({}, state, {
				list: action.payload
			});
		case 'FOOD_PRICE':
			return Object.assign({}, state, {
				price: action.payload
			});
		default:
			return state;
	}
};

export default reducer;