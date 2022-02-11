import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

import { alert } from '../../../utils';
import { deleteUser, putUser } from '../../../../datas';
import { user_data } from '../../../../actions';

import '../index.css';

const Component = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const _user = useSelector(state => state.user);

	const [_userName, _setUserName] = useState(_user.userName);
	const [_userTel, _setUserTel] = useState(_user.userTel);

	useEffect(() => {
		if (_user.id === -1) {
			navigate('/login');
		}
	}, [navigate, _user.id]);

	const _invalidCheck = () => {
		const _blank = /[\s]/g;
		const form = document.mypage;

		if (_blank.test(form.pwd1.value) || form.pwd1.value !== form.pwd2.value) {
			_invalidAnimation('pwd1');
			_invalidAnimation('pwd2');
			return 0;
		} if (_blank.test(form.userName.value)) {
			_invalidAnimation('name');
			return 0;
		} if (_blank.test(form.userTel.value)) {
			_invalidAnimation('tel');
			return 0;
		} return 1;
	};

	const _invalidAnimation = (css) => {
		$('.shaking_' + css).css('animation', 'shaking 500ms 1');
		setTimeout(() => $('.shaking_' + css).css('animation', 'none'), 500);
	};

	const _putUser = (e) => {
		e.preventDefault();
		const form = document.mypage;

		putUser(_user.userId, form.pwd1.value, form.userName.value, form.userTel.value, res => {
			if (res.status === 200) {
				alert(
					'confirm',
					'Your information has been changed.',
					() => dispatch(user_data({
						id: res.obj.id,
						userId: res.obj.userId,
						userName: res.obj.userName,
						userTel: res.obj.userTel
					})),
					() => null
				);
			} else {
				alert(
					'confirm',
					'Something went wrong.',
					() => null,
					() => null
				);
			}
		});
	};

	const _deleteUser = (e) => {
		e.preventDefault();

		deleteUser(_user.userId, res => {
			if (res.status === 200) {
				alert(
					'confirm',
					'Successfully deleted.',
					() => {
						dispatch(user_data({
							id: -1,
							userId: '',
							userName: '',
							userTel: ''
						}));
						navigate('/login');
					},
					() => null
				);
			}
		});
	};

	const _handleForm = (e) => {
		e.preventDefault();

		if (_invalidCheck()) {
			alert(
				'question',
				'Are you sure to change?',
				() => _putUser(e),
				() => null
			);
		}
	};

	const _handleDelete = (e) => {
		e.preventDefault();

		alert(
			'question',
			'Are you sure to delete?',
			() => _deleteUser(e),
			() => null
		);
	}

	const _handleLogOut = (e) => {
		e.preventDefault();

		alert(
			'question',
			'Are you sure to log-out?',
			() => {
				dispatch(user_data({
					id: -1,
					userId: '',
					userName: '',
					userTel: ''
				}));
				navigate('/');
			},
			() => null
		)
	}

	return (
		<div className='authpage_wrapper'>
			<div className='authpage_signup_container'>
				<div className='authpage_title'>MY PAGE</div>
				<div className='authpage_brand_name_container'>
					<div className='authpage_brand_name'>Foodie</div>
					<div className='authpage_brand_empty_space_logout' onClick={(e) => _handleLogOut(e)}>LogOut</div>
				</div>
				<form name='mypage' autoComplete='off' onSubmit={(e) => _handleForm(e)}>
					<input
						className='auth_input'
						type='text'
						value={_user.userId}
						disabled
					/>
					<input
						className='auth_input shaking_pwd1'
						type='password'
						name='pwd1'
						placeholder='Password'
						minLength={7}
						maxLength={25}
						required
						autoFocus
					/>
					<input
						className='auth_input shaking_pwd2'
						type='password'
						name='pwd2'
						placeholder='Password Confirm'
						minLength={7}
						maxLength={25}
						required
					/>
					<input
						className='auth_input shaking_name'
						type='text'
						name='userName'
						value={_userName}
						onChange={(e) => _setUserName(e.target.value)}
						minLength={4}
						maxLength={20}
						required
					/>
					<input
						className='auth_input shaking_tel'
						type='text'
						name='userTel'
						value={_userTel}
						onChange={(e) => _setUserTel(e.target.value)}
						minLength={3}
						maxLength={15}
						required
					/>
					<button className='authpage_input_btn' type='submit'>CHANGE</button>
				</form>
				<hr style={{ margin: '20px 0' }} />
				<div className='authpage_link_container'>
					<div className='authpage_link_text'>Delete your account?</div>
					<div className='authpage_link_to' onClick={(e) => _handleDelete(e)}>YES</div>
				</div>
			</div>
		</div>
	);
};

export default Component;