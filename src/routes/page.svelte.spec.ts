import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render the CSV uploader component', () => {
		render(Page);
		
		const heading = screen.getByText(/DataStream Temperature Calculator/i);
		expect(heading).toBeInTheDocument();
	});
});