import React from 'react';
import gql from 'graphql-tag';
// import Styles from './Form.module.scss';
import { Query } from '@apollo/react-components';
import Styles from './../Form/Form.module.scss';

export const GET_MOVIES = gql`
	query Movies($movie: String!) {
		someMovies: allFilms(filter: { title: $movie }) {
			species {
				name
				id
			}
			planets {
				name
				id
			}
			id
			title
		}

		allMovies: allFilms {
			id
			title
		}
	}
`;

const Movies = ({ movie }) => (
	<Query query={GET_MOVIES} variables={{ movie }}>
		{({ loading, error, data }) => {
			if (loading) return 'Loading...';
			if (error) return `Error! ${error.message}`;
			return (
				<div className={Styles.formFilter}>
					<select name="movie" value={movie}>
						<option value="">Select</option>

						{data.allMovies.map(movie => (
							<option key={movie.id} value={movie.title}>
								{movie.title}
							</option>
						))}
					</select>
				</div>
			);
		}}
	</Query>
);

export default Movies;
