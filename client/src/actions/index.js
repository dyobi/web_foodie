/***************************************************/

export const food_list = (value) => {
	return {
		type: 'FOOD_LIST',
		payload: value
	};
};

/***************************************************/

export const food_price = (value) => {
	return {
		type: 'FOOD_PRICE',
		payload: value
	};
};

/***************************************************/

export const user_data = (value) => {
	return {
		type: 'USER_DATA',
		payload: value
	};
}

/***************************************************/