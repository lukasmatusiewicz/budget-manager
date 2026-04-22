import { describe, it, expect } from 'vitest';
import { convertToCSV } from './exportUtils';

describe('exportUtils', () => {
  describe('convertToCSV', () => {
    it('should convert an array of objects to CSV string', () => {
      const data = [
        { id: '1', description: 'Coffee', amount: 5, date: '2023-10-01', type: 'expense' },
        { id: '2', description: 'Salary', amount: 3000, date: '2023-10-01', type: 'income' }
      ];
      
      const expected = 'id,description,amount,date,type\n"1","Coffee","5","2023-10-01","expense"\n"2","Salary","3000","2023-10-01","income"';
      expect(convertToCSV(data)).toBe(expected);
    });

    it('should handle special characters in CSV', () => {
      const data = [
        { description: 'Dinner "Fancy"', category: 'Food' }
      ];
      const result = convertToCSV(data);
      expect(result).toContain('"Dinner \\"Fancy\\""');
    });

    it('should return empty string for empty data', () => {
      expect(convertToCSV([])).toBe('');
      expect(convertToCSV(null)).toBe('');
    });
  });
});
