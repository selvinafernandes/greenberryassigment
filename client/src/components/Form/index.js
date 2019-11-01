import React, { Component } from 'react';
import Styles from './Form.module.scss';
import Movies from './../Movie';
import Species from './../Species';
import Planets from './../Planets';

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: '',
			species: '',
			planet: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value }, () => {
			this.props.updateFilter(this.state);
		});
	};

	render() {
		const { movie, species, planet } = this.state;

		return (
			<React.Fragment>
				<form className={Styles.form} onChange={this.handleChange}>
					<Movies movie={movie} species={species} planet={planet} />
					<Species movie={movie} planet={planet} />
					<Planets movie={movie} species={species} />
				</form>
			</React.Fragment>
		);
	}
}

export default Form;
