import { confirmAlert } from 'react-confirm-alert';

export const alert = (type, message, cb1, cb2) => {
	if (type === 'question') {
		confirmAlert({
			message: message,
			buttons: [
				{
					label: 'Yes',
					onClick: () => cb1()
				}, {
					label: 'No',
					onClick: () => cb2()
				}
			]
		});
	} else if (type === 'confirm') {
		confirmAlert({
			message: message,
			buttons: [
				{
					label: 'Confirm',
					onClick: () => cb1()
				}
			]
		});
	}
};