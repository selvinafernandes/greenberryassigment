const express = require('express');
const bodyParser = require('body-parser');
const getData = require('./getData');
const cors = require('cors');
const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/starwars', (req, res) => {
	let filmTitle = req.query.movie;
	let planetName = req.query.planet;
	let speciesName = req.query.species;
	let filmUrl;
	let planetUrl;
	let speciesUrl;
	let characters;

	if (filmTitle) {
		new Promise((resolve, reject) => {
			getData(
				`https://swapi.co/api/films/?search=${filmTitle}`,
				[],
				resolve,
				reject
			);
		}).then(response => {
			filmUrl = response
				.filter(film => {
					return film.title === filmTitle;
				})
				.map(film => {
					return film.url;
				});
		});
	}

	if (planetName) {
		new Promise((resolve, reject) => {
			getData(
				`https://swapi.co/api/planets/?search=${planetName}`,
				[],
				resolve,
				reject
			);
		}).then(response => {
			planetUrl = response
				.filter(planet => {
					return planet.name === planetName;
				})
				.map(planet => {
					return planet.url;
				});
		});
	}

	if (speciesName) {
		new Promise((resolve, reject) => {
			getData(
				`https://swapi.co/api/species/?search=${speciesName}`,
				[],
				resolve,
				reject
			);
		}).then(response => {
			speciesUrl = response
				.filter(species => {
					return species.name === speciesName;
				})
				.map(species => {
					return species.url;
				});
		});
	}

	new Promise((resolve, reject) => {
		getData('https://swapi.co/api/people/', [], resolve, reject);
	}).then(response => {
		//if filmurl var match on the url
		characters = response.filter(char => {
			if (
				(!filmUrl || char.films.includes(filmUrl[0])) &&
				(!planetUrl || char.homeworld === planetUrl[0]) &&
				(!speciesUrl || char.species.includes(speciesUrl[0]))
			) {
				return char;
			}
		});

		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({ data: characters }));
	});
});

app.listen(port, () => {
	console.log('Express server is running on localhost');
});
