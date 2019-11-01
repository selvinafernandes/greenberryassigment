# SWAPI Implementation

This project shows all the characters retrieved from the SWAPI API and in turn filters based on the properties specified.

- [Star Wars API Docs](https://swapi.co/documentation)
- [Star Wars API GraphiQL interface][https://graphiql.graphcms.com/simple/v1/swapi] - SWAPI GraphQL for getting the filter results

## Installation

- Git clone this project from [here](https://github.com/selvinafernandes/SWAPI-Impl.git)

- Run npm install on server as well as client folder

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Will run the client and server at the same time. Opens (http://localhost:3000) by default.
The page will reload if you make edits.<br>
You will also see any errors in the console.

### `npm start`

Runs the client in the development mode.<br>

### `npm test`

Will run your test files.

### `npm run server`

Will run the server separately

## Using CSS

For this application we are using scss with camelCase classes for nesting. For React you will style at the style file in your component folder `<style>`

```scss
.modal {
	background-color: $white;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	height: calc(100% - 60px);
	border-top: 1px solid $gold;
	z-index: 4;
	overflow-x: hidden;

	&Icon {
		height: 20px;
		width: 20px;
		background-image: url('../../assets/img/close.svg');
		background-size: 20px;
		margin: 17px 20px 0 0;

		&Wrapper {
			display: flex;
			justify-content: flex-end;
		}
	}

	&Content {
		padding: 20px;

		@include for-tablet {
			padding: 40px 60px;
		}
	}
}
```

## Adding Components

We recommend keeping React components in `./components` by adding it like

`./components/<componentName>/index.js`

## License

[MIT](https://choosealicense.com/licenses/mit/)
