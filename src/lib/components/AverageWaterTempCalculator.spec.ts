import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import AverageWaterTempCalculator from './AverageWaterTempCalculator.svelte';

describe('AverageWaterTempCalculator', () => {
	it('should have a file input', () => {
		render(AverageWaterTempCalculator);
		
		const fileInput = screen.getByLabelText(/CSV File/i);
		expect(fileInput).toBeInTheDocument();
		expect(fileInput).toHaveAttribute('type', 'file');
		expect(fileInput).toHaveAttribute('accept', '.csv');
	});

	it('should have a monitoring location input', () => {
		render(AverageWaterTempCalculator);
		
		const locationInput = screen.getByLabelText(/Monitoring Location ID/i);
		expect(locationInput).toBeInTheDocument();
		expect(locationInput).toHaveAttribute('type', 'text');
	});

	it('should have a calculate button that is initially disabled', () => {
		render(AverageWaterTempCalculator);
		
		const calculateButton = screen.getByRole('button', { name: /Calculate Average/i });
		expect(calculateButton).toBeInTheDocument();
		expect(calculateButton).toBeDisabled();
	});
});