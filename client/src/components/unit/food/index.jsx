import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

import { foodlist, alert } from '../../utils';
import { food_list, food_price } from '../../../actions';

import './index.css';

const Component = () => {

	const _user = useSelector(state => state.user);
	const _food = useSelector(state => state.food);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const _cart_ease_in = () => {
		$('.cart_list_wrapper').css('transform', 'none');
		$('.cart_list_wrapper').css('transition', 'transform 300ms ease-in-out');
	};

	const _cart_ease_out = () => {
		$('.cart_list_wrapper').css('transform', 'translateX(85%)');
		$('.cart_list_wrapper').css('transition', 'transform 300ms ease-in-out');
	};

	const _addItem = (index) => {
		_food.list.push(index);
		dispatch(food_list(_food.list));
		dispatch(food_price(_food.price + foodlist[index].price));
	}

	const _deleteItem = (index) => {
		dispatch(food_price(_food.price - foodlist[_food.list[index]].price));
		_food.list.splice(index, 1);
		dispatch(food_list(_food.list));
	}

	const _resetItem = () => {
		dispatch(food_list([]));
		dispatch(food_price(0));
	}

	const _handleBook = (e) => {
		e.preventDefault();

		if (_food.price === 0) {
			return ;
		} else if (_user.id === -1) {
			alert(
				'confirm',
				'This service requires log-in\n\nYou will be taken to the login page.',
				() => navigate('/login'),
				null
			);
		} else {
			alert(
				'question',
				'Are you sure to book?\n\nIf so, you will be taken to booking page.',
				() => navigate('/book'),
				() => null
			);
		}
	};

	return (
		<div className='foodpage_wrapper'>
			<div className='cart_list_wrapper' onMouseOver={() => _cart_ease_in()} onMouseLeave={() => _cart_ease_out()}>
				<div className='cart_list_title'>CART LIST</div>
				<div className='cart_list_main_container'>
					<div className='cart_list_items_container'>
						{_food.list.map((item, index) =>
							<div className='cart_list_item_each' key={index}>
								<div>
									<button className='cart_list_item_xBtn' onClick={() => _deleteItem(index)}>x</button>
									{foodlist[item].nick}
								</div>
								<div style={{ margin: '2px' }}>{foodlist[item].price.toLocaleString()}원</div>
							</div>
						)}
					</div>
					<div className='cart_list_total_price'>Total : {_food.price.toLocaleString()} 원</div>
					<div className='cart_list_btn_container'>
						<button className='cart_list_btn' onClick={(e) => _handleBook(e)}>BOOK</button>
						<button className='cart_list_btn' onClick={() => _resetItem()}>RESET</button>
					</div>
				</div>
			</div>
			<div className='foodpage_title'>What Brought You Here</div>
			<div className='food_wrapper'>
				{foodlist.map((food, index) =>
					<div className='food_container' key={index} onClick={() => _addItem(index)}>
						<div className='food_img' style={{ backgroundImage: `url(${food.img})` }} />
						<hr style={{ margin: '15px 0 10px 0' }} />
						<div className='food_title'>{food.title}</div>
						<div className='food_price'>{food.price.toLocaleString()} 원</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Component;