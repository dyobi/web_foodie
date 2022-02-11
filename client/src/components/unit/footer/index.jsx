import Logo from '../../../assets/icons/logo.png';

import './index.css';

const Component = () => {
	return (
		<div className='footer_wrapper'>
			<hr />
			<div className='footer'>
				<div className='footer_text'>
					<img src={Logo} alt='' />
					<span>FAQ</span>/
					<span>Terms</span>/
					<span>Cookie Policy</span>/
					<span>Privacy Settings</span>
				</div>
				<span>© 2022 Foodie Group, All rights Reserved.</span>
			</div>
		</div>
	);
};

export default Component;