import React from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import Styles from './../Form/Form.module.scss';

export const GET_SPECIES = gql`
	query Species($movie: String!) {
		someSpecies: allSpecies(filter: { films_some: { title: $movie } }) {
			id
			name
		}
		allSpecies {
			name
			id
		}
	}
`;

const Species = ({ movie, species }) => (
	<Query query={GET_SPECIES} variables={{ movie, species }}>
		{({ loading, error, data }) => {
			if (loading) return 'Loading...';
			if (error) return `Error! ${error.message}`;

			return (
				<div className={Styles.formFilter}>
					<select name="species" value={species}>
						<option value="">Select</option>

						{movie.length > 0
							? data.someSpecies.map(specie => (
									<option key={specie.id} value={specie.name}>
										{specie.name}
									</option>
							  ))
							: data.allSpecies.map(specie => (
									<option key={specie.id} value={specie.name}>
										{specie.name}
									</option>
							  ))}
					</select>
				</div>
			);
		}}
	</Query>
);

export default Species;
