import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render the CSV uploader component', () => {
		render(Page);
		
		// Check if the card title is rendered
		const heading = screen.getByText(/DataStream Temperature Calculator/i);
		expect(heading).toBeInTheDocument();
	});

	it('should have a file input', () => {
		render(Page);
		
		const fileInput = screen.getByLabelText(/CSV File/i);
		expect(fileInput).toBeInTheDocument();
		expect(fileInput).toHaveAttribute('type', 'file');
		expect(fileInput).toHaveAttribute('accept', '.csv');
	});

	it('should have a monitoring location input', () => {
		render(Page);
		
		const locationInput = screen.getByLabelText(/Monitoring Location ID/i);
		expect(locationInput).toBeInTheDocument();
		expect(locationInput).toHaveAttribute('type', 'text');
	});

	it('should have a calculate button that is initially disabled', () => {
		render(Page);
		
		const calculateButton = screen.getByRole('button', { name: /Calculate Average/i });
		expect(calculateButton).toBeInTheDocument();
		expect(calculateButton).toBeDisabled();
	});
});