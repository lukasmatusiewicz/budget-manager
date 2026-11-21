import { describe, it, expect, vi, afterEach } from 'vitest';
import { convertToCSV, exportTransactionsToCSV, exportTransactionsToJSON } from './exportUtils';

describe('exportUtils', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('convertToCSV', () => {
    it('should convert an array of objects to CSV string', () => {
      const data = [
        { id: '1', description: 'Coffee', amount: 5, date: '2023-10-01', type: 'expense' },
        { id: '2', description: 'Salary', amount: 3000, date: '2023-10-01', type: 'income' }
      ];

      const expected = 'id,description,amount,date,type\n"1","Coffee","5","2023-10-01","expense"\n"2","Salary","3000","2023-10-01","income"';
      expect(convertToCSV(data)).toBe(expected);
    });

    it('should escape double quotes per RFC 4180', () => {
      const data = [
        { description: 'Dinner "Fancy"', category: 'Food' }
      ];
      const result = convertToCSV(data);
      expect(result).toBe('description,category\n"Dinner ""Fancy""","Food"');
    });

    it('should preserve falsy numeric 0, false, and negative numbers while handling null/undefined', () => {
      const data = [
        { amount: 0, negative: -42.5, active: false, note: null, extra: undefined }
      ];
      const result = convertToCSV(data);
      expect(result).toBe('amount,negative,active,note,extra\n"0","-42.5","false","",""');
    });

    it('should preserve commas and newlines inside quoted fields', () => {
      const data = [
        { description: 'Groceries, Market\nLine 2', amount: 25 }
      ];
      const result = convertToCSV(data);
      expect(result).toBe('description,amount\n"Groceries, Market\nLine 2","25"');
    });

    it('should neutralize spreadsheet formula-injection payloads in cells and headers', () => {
      const data = [
        {
          '=HEADER': '=SUM(A1)',
          normal: '+cmd',
          at: '@SUM(1,2)',
          dash: '-1+1',
          tab: '\t=1',
          cr: '\r=1',
          leadingSpace: '  =1+1'
        }
      ];
      const result = convertToCSV(data);
      expect(result).toBe(
        '"\'=HEADER",normal,at,dash,tab,cr,leadingSpace\n"\'=SUM(A1)","\'+cmd","\'@SUM(1,2)","\'-1+1","\'\t=1","\'\r=1","\'  =1+1"'
      );
    });

    it('should return empty string for empty data', () => {
      expect(convertToCSV([])).toBe('');
      expect(convertToCSV(null)).toBe('');
    });
  });

  describe('exportTransactionsToCSV & exportTransactionsToJSON', () => {
    it('triggers browser downloads for CSV and JSON exports', () => {
      const clickMock = vi.fn();
      const anchorMock = { href: '', download: '', click: clickMock };
      vi.spyOn(document, 'createElement').mockReturnValue(anchorMock);
      const createObjectURLMock = vi.fn(() => 'blob:mock-url');
      const revokeObjectURLMock = vi.fn();
      globalThis.URL.createObjectURL = createObjectURLMock;
      globalThis.URL.revokeObjectURL = revokeObjectURLMock;

      const transactions = [{ id: '1', description: 'Book', amount: 15 }];
      exportTransactionsToCSV(transactions);
      expect(anchorMock.download).toMatch(/^transactions_\d{4}-\d{2}-\d{2}\.csv$/);
      expect(clickMock).toHaveBeenCalledTimes(1);
      expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url');

      exportTransactionsToJSON(transactions);
      expect(anchorMock.download).toMatch(/^transactions_\d{4}-\d{2}-\d{2}\.json$/);
      expect(clickMock).toHaveBeenCalledTimes(2);
    });
  });
});
