<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Papa from 'papaparse';
	import {calculateAverageTemperature} from '$lib/utils/temperature'
	
	interface CSVRow {
		MonitoringLocationID: string;
		CharacteristicName: string;
		ResultValue: string;
		[key: string]: string;
	}

	let fileInput: HTMLInputElement;
	let parsedData: CSVRow[] = [];
	let monitoringLocationId = '';
	let averageResult: number | null = null;
	let errorMessage = '';
	let fileName = '';
	let isDataLoaded = false;

	$: isDataLoaded = parsedData.length > 0;

	function handleFileUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];

		if (!file) return;

		fileName = file.name;
		errorMessage = '';
		averageResult = null;

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				parsedData = results.data as CSVRow[];
				isDataLoaded = true;
			},
			error: (error) => {
				errorMessage = `Error parsing CSV: ${error.message}`;
				parsedData = [];
				isDataLoaded = false;
			}
		});
	}
	function calculateAverage() {
		if (!parsedData.length) {
			errorMessage = 'Please upload a CSV file first';
			return;
		}

		if (!monitoringLocationId.trim()) {
			errorMessage = 'Please enter a Monitoring Location ID';
			return;
		}

		const result = calculateAverageTemperature(parsedData, monitoringLocationId.trim());

		if (!result) {
			errorMessage = `No temperature data found for location: ${monitoringLocationId}`;
			averageResult = null;
			return;
		}

		averageResult = result.average;
		errorMessage = '';
	}

	function resetForm() {
		parsedData = [];
		monitoringLocationId = '';
		averageResult = null;
		errorMessage = '';
		fileName = '';
		if (fileInput) {
			fileInput.value = '';
		}
	}
</script>

<div class="container mx-auto p-8 max-w-2xl">
	<Card>
		<CardHeader>
			<CardTitle>DataStream Temperature Calculator</CardTitle>
			<CardDescription>
				Upload a CSV file and calculate average water temperature for a monitoring location
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-6">
			<!-- File Upload Section -->
			<div class="space-y-2">
				<Label for="csv-upload">CSV File</Label>
				<input
					id="csv-upload"
					type="file"
					accept=".csv"
					bind:this={fileInput}
					on:change={handleFileUpload}
					class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				/>
				{#if fileName}
					<p class="text-sm text-muted-foreground">Loaded: {fileName}</p>
				{/if}
			</div>

			<!-- Monitoring Location ID Input -->
			<div class="space-y-2">
				<Label for="location-id">Monitoring Location ID</Label>
				<Input
					id="location-id"
					type="text"
					placeholder="Enter location ID (e.g., 0000ALNW-0001)"
					bind:value={monitoringLocationId}
				/>
			</div>

			<!-- Action Buttons -->
			<div class="flex gap-4">
				<Button onclick={calculateAverage} disabled={!isDataLoaded}>
					Calculate Average
				</Button>
				<Button variant="outline" onclick={resetForm}>Reset</Button>
			</div>

			<!-- Debug Info -->
			{#if parsedData.length > 0}
				<p class="text-sm text-muted-foreground">
					✓ Loaded {parsedData.length} rows from CSV
				</p>
			{/if}

			<!-- Results Display -->
			{#if averageResult !== null}
				<Card class="bg-blue-50 border-blue-200">
					<CardContent class="p-6">
						<p class="text-sm font-medium text-blue-900">Average Water Temperature</p>
						<p class="text-3xl font-bold text-blue-700 mt-2">
							{averageResult.toFixed(2)}°C
						</p>
						<p class="text-sm text-blue-600 mt-1">
							Location: {monitoringLocationId}
						</p>
					</CardContent>
				</Card>
			{/if}

			<!-- Error Message -->
			{#if errorMessage}
				<Card class="bg-red-50 border-red-200">
					<CardContent class="pt-6">
						<p class="text-sm font-medium text-red-900">Error</p>
						<p class="text-sm text-red-700 mt-1">{errorMessage}</p>
					</CardContent>
				</Card>
			{/if}
		</CardContent>
	</Card>
</div>