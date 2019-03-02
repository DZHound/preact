import { createElement as h, render } from 'preact';
import { spy } from 'sinon';
import { setupScratch, teardown, setupRerender } from '../../../test/_util/helpers';
import { useCallback } from '../../src';

/** @jsx h */


describe('useCallback', () => {

	/** @type {HTMLDivElement} */
	let scratch;

	/** @type {() => void} */
	let rerender;

	beforeEach(() => {
		scratch = setupScratch();
		rerender = setupRerender();
	});

	afterEach(() => {
		teardown(scratch);
	});


	it('only recomputes the callback when inputs change', () => {
		const callbacks = [];

		function Comp({ a, b }) {
			const cb = useCallback(() => a + b, [a, b]);
			callbacks.push(cb);
			return null;
		}

		render(<Comp a={1} b={1} />, scratch);
		render(<Comp a={1} b={1} />, scratch);

		expect(callbacks[0]).to.equal(callbacks[1]);
		expect(callbacks[0]()).to.equal(2);

		render(<Comp a={1} b={2} />, scratch);
		render(<Comp a={1} b={2} />, scratch);

		expect(callbacks[1]).to.not.equal(callbacks[2]);
		expect(callbacks[2]).to.equal(callbacks[3]);
		expect(callbacks[2]()).to.equal(3);
	});

});
