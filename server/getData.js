const axios = require('axios');

module.exports = getCharacters = (url, characters, resolve, reject) => {
	axios
		.get(url)
		.then(response => {
			const retrievedCharacters = characters.concat(response.data.results);
			if (response.data.next !== null) {
				getCharacters(response.data.next, retrievedCharacters, resolve, reject);
			} else {
				resolve(retrievedCharacters);
			}
		})
		.catch(error => {
			console.log(error);
			reject('Something went wrong');
		});
};
