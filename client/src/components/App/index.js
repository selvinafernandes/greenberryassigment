import React, { Component } from 'react';
import Styles from './App.module.scss';
import Form from '../Form';
import Character from '../Character';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			characterList: [],
			loading: false
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.updateCharacterList();
	}

	updateCharacterList = async params => {
		this.setState({ loading: true });
		let url = new URL('http://localhost:3001/api/starwars/');
		if (params) {
			Object.keys(params).forEach(key =>
				url.searchParams.append(key, params[key])
			);
		}

		try {
			const response = await fetch(url, {
				mode: 'cors',
				headers: {
					'Access-Control-Allow-Origin': '*'
				}
			});
			const responseJson = await response.json();
			this.setState(prevState => ({
				...prevState,
				characterList: responseJson.data,
				loading: false
			}));
		} catch (e) {
			console.log(e);
		}
	};

	updateFilter = value => {
		const { movie, species, planet } = value;
		let params = {};

		if (movie) {
			params = { ...params, movie: movie };
		}
		if (species) {
			params = { ...params, species: species };
		}
		if (planet) {
			params = { ...params, planet: planet };
		}
		this.updateCharacterList(params);
	};

	render() {
		const { loading, characterList } = this.state;
		return (
			<div className={Styles.container}>
					<Form updateFilter={value => this.updateFilter(value)} />
					{loading ? (
						<div className={Styles.loader}></div>
					) : (
						<ul className={Styles.cards}>
							{characterList.map((char, index) => (
								<Character key={index} char={char} />
							))}
						</ul>
					)}
			</div>
		);
	}
}

export default App;
