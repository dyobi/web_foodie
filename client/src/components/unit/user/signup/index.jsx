import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';

import { getUserName, signup } from '../../../../datas';
import { alert } from '../../../utils/alert';

import '../index.css';

const Component = () => {

	const navigate = useNavigate();
	const _user = useSelector(state => state.user);

	useEffect(() => {
		if (_user.id !== -1) {
			navigate('/');
		}
	}, [navigate, _user.id]);

	const _userIdCheck = (e) => {
		e.preventDefault();
		const form = document.signup;

		if (form.userId.value !== '') {
			getUserName(document.signup.userId.value, res => {
				if (res.status === 400) {
					_invalidAnimation('id');
				}
			});
		}
	};

	const _invalidCheck = () => {
		const _blank = /[\s]/g;
		const form = document.signup;

		if (_blank.test(form.userId.value)) {
			_invalidAnimation('id');
			return 0;
		} if (_blank.test(form.pwd1.value) || form.pwd1.value !== form.pwd2.value) {
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

	const _handleForm = (e) => {
		e.preventDefault();
		const form = document.signup;

		if (_invalidCheck()) {
			signup(form.userId.value, form.pwd1.value, form.userName.value, form.userTel.value, res => {
				if (res.status === 200) {
					alert(
						'confirm',
						'Succesfully Joined :)\n\nYou will be taken to the login page.',
						() => navigate('/login'),
						() => null
					);
				} else {
					_invalidAnimation('id');
				}
			})
		}
	};

	return (
		<div className='authpage_wrapper'>
			<div className='authpage_signup_container'>
				<div className='authpage_title'>JOIN</div>
				<div className='authpage_brand_name_container'>
					<div className='authpage_brand_name'>Foodie</div>
					<div className='authpage_brand_empty_space'></div>
				</div>
				<form name='signup' autoComplete='off' onSubmit={(e) => _handleForm(e)}>
					<input
						className='auth_input shaking_id'
						type='text'
						name='userId'
						onBlur={(e) => _userIdCheck(e)}
						placeholder='Your ID'
						minLength={4}
						maxLength={20}
						required
						autoFocus
					/>
					<input
						className='auth_input shaking_pwd1'
						type='password'
						name='pwd1'
						placeholder='Password'
						minLength={7}
						maxLength={25}
						required
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
						placeholder='Name'
						minLength={4}
						maxLength={20}
						required
					/>
					<input
						className='auth_input shaking_tel'
						type='text'
						name='userTel'
						placeholder='Phone No.'
						minLength={3}
						maxLength={15}
						required
					/>
					<button className='authpage_input_btn' type='submit'>JOIN</button>
				</form>
				<hr style={{ margin: '20px 0' }} />
				<div className='authpage_link_container'>
					<div className='authpage_link_text'>Already have one?</div>
					<Link to='/login' style={{ textDecoration: 'none' }}><div className='authpage_link_to'>LOGIN</div></Link>
				</div>
			</div>
		</div>
	);
};

export default Component;