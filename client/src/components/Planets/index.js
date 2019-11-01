import React from 'react';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import Styles from './../Form/Form.module.scss';

export const GET_PLANETS = gql`
	query Planets($movie: String!, $species: String!) {
		somePlanets: allPlanets(filter: { films_some: { title: $movie } }) {
			id
			name
		}

		somePlanetsWithSpecies: allPlanets(
			filter: {
				AND: [
					{ films_some: { title: $movie } }
					{ residents_every: { species_every: { name: $species } } }
				]
			}
		) {
			id
			name
		}
		allPlanet: allPlanets {
			name
			id
		}
	}
`;

const Planets = ({ movie, species, planetSelected }) => (
	<Query query={GET_PLANETS} variables={{ movie, species }}>
		{({ loading, error, data }) => {
			if (loading) return 'Loading...';
			if (error) return `Error! ${error.message}`;

			return (
				<div className={Styles.formFilter}>
					<select name="planet" onChange={planetSelected}>
						<option value="">Select</option>
						{movie.length > 0 && species.length > 0
							? data.somePlanetsWithSpecies.map(specie => (
									<option key={specie.id} value={specie.name}>
										{specie.name}
									</option>
							  ))
							: movie.length > 0
							? data.somePlanets.map(specie => (
									<option key={specie.id} value={specie.name}>
										{specie.name}
									</option>
							  ))
							: data.allPlanet.map(specie => (
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

export default Planets;
