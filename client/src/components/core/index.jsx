import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import $ from 'jquery';

import mainImg from '../../assets/images/main_img.png';
import Home from '../unit/home';
import Food from '../unit/food';
import Book from '../unit/book';
import Login from '../unit/user/login';
import Signup from '../unit/user/signup';
import Mypage from '../unit/user/mypage';
import Footer from '../unit/footer';

import './index.css';

const Menubar = () => {

	const _user = useSelector(state => state.user);

	return (
		<div id='header_menubar'>
			<Link to='/home'><div className='header_logo'>Foodie</div></Link>
			<div className='header_menu'>
				<Link to='/food' style={{ textDecoration: 'none' }}><div className='header_menu_item'>Food</div></Link>
				<Link to='/book' style={{ textDecoration: 'none' }}><div className='header_menu_item'>Book</div></Link>
				{_user.id === -1 ?
					<Link to='/login' style={{ textDecoration: 'none' }}><div className='header_menu_item'>Login</div></Link>
					:
					<Link to='/mypage' style={{ textDecoration: 'none' }}><div className='header_menu_item'>Mypage</div></Link>
				}
			</div>
		</div>
	);
}

const Component = (props) => {

	$(window).on('scroll', () => {
		if ($(window).scrollTop()) {
			$('#header_menubar').css('background', 'black');
			$('.header_logo').css('color', 'white');
			$('.header_menu_item').css('color', 'white');
		} else {
			$('#header_menubar').css('background', 'transparent');
			$('.header_logo').css('color', 'black');
			$('.header_menu_item').css('color', 'black');
		}
	})

	return (
		<div>
			{
				props.page === '0' ?
					<div style={{ width: '100%', height: '100vh' }}>
						<Parallax className='header_home_wrapper' bgImage={mainImg} strength={1000}>
							<Menubar />
							<span className='home_title'>Foodie</span>
						</Parallax>
						<Home />
						<Footer />
					</div>
					:
					<div className='header_default_wrapper'>
						<Menubar />
						<div className='main_container'>
							{props.page === '1' ? <Food /> : ''}
							{props.page === '2' ? <Book /> : ''}
							{props.page === '3' ? <Login /> : ''}
							{props.page === '4' ? <Signup /> : ''}
							{props.page === '5' ? <Mypage /> : ''}
						</div>
						<Footer />
					</div>
			}
		</div>
	);
};

export default Component;