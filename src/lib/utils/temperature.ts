export interface TemperatureData {
  MonitoringLocationID: string;
  CharacteristicName: string;
  ResultValue: string;
}

export interface CalculationResult {
  average: number;
  count: number;
}

export function calculateAverageTemperature(
  data: TemperatureData[],
  locationId: string
): CalculationResult | null {
  const filteredData = data.filter(
    (row) =>
      row.CharacteristicName === 'Temperature, water' &&
      row.MonitoringLocationID === locationId
  );

  if (filteredData.length === 0) {
    return null;
  }

  const values = filteredData
    .map((row) => parseFloat(row.ResultValue))
    .filter((val) => !isNaN(val));

  if (values.length === 0) {
    return null;
  }

  const sum = values.reduce((acc, val) => acc + val, 0);
  
  return {
    average: sum / values.length,
    count: values.length
  };
}