import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';

import { signin } from '../../../../datas';
import { user_data } from '../../../../actions';

import '../index.css';

const Component = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const _user = useSelector(state => state.user);

	useEffect(() => {
		if (_user.id !== -1) {
			navigate('/');
		}
	}, [navigate, _user.id]);

	const _handleForm = (e) => {
		e.preventDefault();

		const form = document.signin;

		signin(form.userId.value, form.pwd.value, res => {
			if (res.status === 200) {
				dispatch(user_data({
					id: res.obj.id,
					userId: res.obj.userId,
					userName: res.obj.userName,
					userTel: res.obj.userTel
				}));
				navigate('/');
			} else {
				$('.auth_input').css('animation', 'shaking 500ms 1');
				setTimeout(() => $('.auth_input').css('animation', 'none'), 500);
			}
		})
	};

	return (
		<div className='authpage_wrapper'>
			<div className='authpage_signin_container'>
				<div className='authpage_title'>LOGIN</div>
				<div className='authpage_brand_name_container'>
					<div className='authpage_brand_name'>Foodie</div>
					<div className='authpage_brand_empty_space'></div>
				</div>
				<form name='signin' autoComplete='off' onSubmit={(e) => _handleForm(e)}>
					<input className='auth_input' type='text' name='userId' placeholder='Your ID' autoFocus required />
					<input className='auth_input' type='password' name='pwd' placeholder='Password' required />
					<button className='authpage_input_btn' type='submit'>LOGIN</button>
				</form>
				<hr style={{ margin: '20px 0' }} />
				<div className='authpage_link_container'>
					<div className='authpage_link_text'>Need an account?</div>
					<Link to='/signup' style={{ textDecoration: 'none' }}><div className='authpage_link_to'>JOIN</div></Link>
				</div>
			</div>
		</div>
	);
}

export default Component;