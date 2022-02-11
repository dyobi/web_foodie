import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { food_list, food_price } from '../../../actions';
import { foodlist, alert } from '../../utils';
import { getOrderList, postOrderList } from '../../../datas';

import './index.css';

const Component = () => {

	const today = new Date();
	const [orderList, setOrderList] = useState([]);
	const _user = useSelector(state => state.user);
	const _food = useSelector(state => state.food);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (_user.id === -1) {
			alert(
				'confirm',
				'This service requires log-in\n\nYou will be taken to the login page.',
				() => navigate('/login'),
				() => null
			);
		} else {
			getOrderList(_user.id, res => {
				if (res.status === 200) {
					setOrderList(res.obj);
				}
			});
		}
	}, [navigate, _user.id]);

	const _handleCancel = (e) => {
		e.preventDefault();

		alert(
			'question',
			'Are you sure to reset your list?',
			() => {
				dispatch(food_list([]));
				dispatch(food_price(0));
			},
			() => null
		)
	};

	const _handleSubmit = (e) => {
		e.preventDefault();

		let list = '';
		for (let i = 0; i < _food.list.length; i++) {
			list = list + '[' + foodlist[_food.list[i]].nick + ']';
		}
		let orderDate = today.getFullYear().toString()
			+ '-' + (today.getMonth() + 1).toString()
			+ '-' + today.getDate().toString();
		let orderHour = document.getElementById('time').value;

		postOrderList(_user.id, list, _food.price, orderDate, orderHour, res => {
			if (res.status === 200) {
				alert(
					'confirm',
					'Successfully booked.\n\nMake sure to be at our restaurant on time.',
					() => null,
					() => null
				);
				dispatch(food_list([]));
				dispatch(food_price(0));
				getOrderList(_user.id, res => {
					if (res.status === 200) {
						setOrderList(res.obj);
					}
				});
			} else {
				alert(
					'confirm',
					'Something went wrong :(',
					() => null,
					() => null
				);
			}
		});
	};

	return (
		<div>
			{_user.id === -1 ?
				<div className='bookpage_wrapper'>
					<div className='bookpage_requirement'>This service requires log-in :(</div>
					<button onClick={() => navigate('/login')}>LOGIN</button>
				</div>
				:
				<div className='bookpage_wrapper'>
					<div className='bookpage_requirement'>We only offer same-day booking.</div>
					<div className='bookpage_current_order'>
						<table>
							<thead>
								<tr>
									<th width="10%">NAME</th>
									<th width="50%">LIST</th>
									<th width="15%">PRICE</th>
									<th width="15%">DATE</th>
									<th width="10%">TIME</th>
									<th></th>
								</tr>
							</thead>
							{_food.price !== 0 ?
								<tbody>
									<tr>
										<td>{_user.userName}</td>
										<td>
											{_food.list.map((item, index) =>
												<span key={index}>[{foodlist[item].nick}]</span>
											)}
										</td>
										<td>{_food.price.toLocaleString()} 원</td>
										<td>{today.getFullYear()}-{today.getMonth() + 1}-{today.getDate()}</td>
										<td>
											<select id='time'>
												<option value='10:00'>10:00</option>
												<option value='11:00'>11:00</option>
												<option value='12:00'>13:00</option>
												<option value='14:00'>14:00</option>
												<option value='15:00'>15:00</option>
												<option value='16:00'>16:00</option>
												<option value='17:00'>17:00</option>
												<option value='18:00'>18:00</option>
												<option value='19:00'>19:00</option>
												<option value='20:00'>20:00</option>
											</select>
										</td>
									</tr>
								</tbody>
								:
								null
							}
						</table>
					</div>
					{_food.price !== 0 ?
						<div>
							<button className='confirmation_btn' onClick={(e) => _handleCancel(e)}>CANCEL</button>
							<button className='confirmation_btn' onClick={(e) => _handleSubmit(e)}>CONFRIM</button>
						</div>
						:
						''
					}
					<div className='bookpage_requirement'>Ordered List</div>
					<div className='bookpage_current_order'>
						<table>
							<thead>
								<tr>
									<th width="10%" />
									<th width="50%" />
									<th width="15%" />
									<th width="15%" />
									<th width="10%" />
									<th></th>
								</tr>
							</thead>
							{orderList.length !== 0 ?
								orderList.map((item, index) =>
									<tbody key={index}>
										<tr>
											<td>{_user.userName}</td>
											<td>{item.list}</td>
											<td>{item.price} 원</td>
											<td>{item.orderDate}</td>
											<td>{item.orderHour}</td>
										</tr>
									</tbody>
								)
								:
								null
							}
						</table>
					</div>
				</div>
			}
		</div>
	);
}

export default Component;