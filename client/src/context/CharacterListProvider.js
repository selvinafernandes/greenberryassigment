import React, { Component } from 'react';

const DefaultState = {
	characterList: [],
	loading: false,
	filter: {}
};

const CharacterListContext = React.createContext(DefaultState);

export const CharacterListConsumer = CharacterListContext.Consumer;

export class CharacterListProvider extends Component {
	state = DefaultState;

	componentDidMount() {
		this.setState({ loading: true });
		fetch('api/starwars')
			.then(res => res.json())
			.then(res => {
				const data = res.data;
				this.setState({
					characterList: data,
					loading: false
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	updateFilter = filter => {
		this.setState({
			filter
		});
	};

	static applyFilter(characterList, filter) {
		const { movie, species, planet } = filter;

		let result = characterList;
		if (movie !== undefined) {
			fetch(`api/starwars/?movie=${movie}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
				.then(res => res.json())
				.then(res => {
					result = res.data;
					return result;
				});
		} else {
			// if (movieSelected) {
			// 	// result = result.filter(item => item.)
			// }
			return result;
		}
	}

	render() {
		const { children } = this.props;
		const { characterList, filter } = this.state;

		const filteredList = CharacterListProvider.applyFilter(
			characterList,
			filter
		);

		console.log(filteredList);
		return (
			<CharacterListContext.Provider
				value={{
					allCharacters: characterList,
					characterList: filteredList,
					updateFilter: this.updateFilter
				}}
			>
				{children}
			</CharacterListContext.Provider>
		);
	}
}
