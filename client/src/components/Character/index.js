import React from 'react';
import Styles from './Character.module.scss';

let placeholderBg = require('../../images/starwars.jpg');

const Character = ({ char }) => {
	if (!char) {
		return null;
	}

	const { name } = char;

	return (
		<li className={Styles.item}>
			<div className={Styles.card}>
				<div
					className={Styles.cardImage}
					style={{ backgroundImage: 'url('+placeholderBg+')' }}
				></div>
				<div className={Styles.cardContent}>
					<div className={Styles.cardContentTitle}>{name}</div>
				</div>
			</div>
		</li>
	);
};

export default Character;
