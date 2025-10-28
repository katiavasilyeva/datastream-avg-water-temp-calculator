// temperature.test.ts
import { describe, it, expect } from 'vitest';
import { calculateAverageTemperature } from './temperature';

describe('calculateAverageTemperature', () => {
  const mockData = [
    { MonitoringLocationID: 'A', CharacteristicName: 'Temperature, water', ResultValue: '10' },
    { MonitoringLocationID: 'A', CharacteristicName: 'Temperature, water', ResultValue: '20' },
    { MonitoringLocationID: 'B', CharacteristicName: 'Temperature, water', ResultValue: '30' },
  ];

  it('calculates average for matching location', () => {
    const result = calculateAverageTemperature(mockData, 'A');
    expect(result).toEqual({ average: 15, count: 2 });
  });

  it('returns null for non-existent location', () => {
    const result = calculateAverageTemperature(mockData, 'C');
    expect(result).toBeNull();
  });

  it('filters out invalid numbers', () => {
    const dataWithInvalid = [
      ...mockData,
      { MonitoringLocationID: 'A', CharacteristicName: 'Temperature, water', ResultValue: 'invalid' }
    ];
    const result = calculateAverageTemperature(dataWithInvalid, 'A');
    expect(result).toEqual({ average: 15, count: 2 });
  });
});