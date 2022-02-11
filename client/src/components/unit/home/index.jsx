import { foodlist } from '../../utils';
import home1 from '../../../assets/images/home1.jpg';
import home2 from '../../../assets/images/home2.jpg';
import home3 from '../../../assets/images/home3.jpg';

import './index.css';

const Component = () => {
	return (
		<div className='home_wrapper'>
			<div className='home_products_container'>
				<>BRAND NEW</>
				<div className='home_products_slide'>
					{foodlist.map((item, index) =>
						<img key={index} src={item.img} />
					)}
				</div>
			</div>
			<div className='home_products_container'>
				<>Different Services</>
				<div className='home_service_container'>
					<div className='home_service_each' style={{backgroundImage: `url(${home1})`}} />
					<div className='home_service_each' style={{backgroundImage: `url(${home2})`}} />
					<div className='home_service_each' style={{backgroundImage: `url(${home3})`}} />
				</div>
			</div>
		</div>
	);
};

export default Component;