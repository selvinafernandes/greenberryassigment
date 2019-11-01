import React from 'react';
import ReactDOM from 'react-dom';
import App from '.';
import { shallow, mount, render } from 'enzyme';
import fetchMock from 'fetch-mock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('componentDidMount should fetch, and put characterList in state if ok', async () => {
		window.fetch = jest.fn().mockImplementation(() => ({
			status: 200,
			json: () =>
				new Promise((resolve, reject) => {
					resolve({
						characterList: [{ item: 'newMovie' }, { item: 'movie' }]
					});
				})
		}));
		const renderedComponent = await shallow(<App />);
		await renderedComponent.update();
		expect(renderedComponent.state('characterList').length).toEqual(2);
	});
});
