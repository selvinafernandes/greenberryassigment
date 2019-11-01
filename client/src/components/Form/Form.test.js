import React from 'react';
import ReactDOM from 'react-dom';
import Form from './../Form';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Render components', () => {
	let wrapper;
	let props = {
		updateFilter: jest.fn()
	};
	let defaultState = {
		movie: '',
		species: '',
		planet: ''
	};

	beforeEach(() => {
		wrapper = shallow(<Form {...props} />);
	});

	it('should render the component', () => {
		expect(wrapper.exists()).toBe(true);
	});

	describe('handleChange', () => {
		it('should call setState on movie', () => {
			const mockEvent = {
				target: {
					name: 'movie',
					value: 'test'
				}
			};

			const expected = {
				movie: 'test',
				species: '',
				planet: ''
			};

			wrapper.instance().handleChange(mockEvent);
			expect(wrapper.state()).toEqual(expected);
		});

		it('should call setState on species', () => {
			const mockEvent = {
				target: {
					name: 'species',
					value: 'test'
				}
			};

			const expected = {
				movie: '',
				species: 'test',
				planet: ''
			};

			wrapper.instance().handleChange(mockEvent);
			expect(wrapper.state()).toEqual(expected);
		});

		it('should call handleChange on movie change', () => {
			const spy = jest.spyOn(wrapper.instance(), 'handleChange');
			wrapper.instance().forceUpdate();

			const mockEvent = {
				target: {
					name: 'movie',
					value: 'test'
				}
			};
			wrapper.find('form').simulate('change', mockEvent);
			expect(spy).toHaveBeenCalledWith(mockEvent);
		});

		it('should call handleChange on planet change', () => {
			const spy = jest.spyOn(wrapper.instance(), 'handleChange');
			wrapper.instance().forceUpdate();

			const mockEvent = {
				target: {
					name: 'planet',
					value: 'test'
				}
			};
			wrapper.find('form').simulate('change', mockEvent);
			expect(spy).toHaveBeenCalledWith(mockEvent);
		});
	});
});
