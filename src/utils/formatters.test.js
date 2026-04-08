import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatters.js';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats USD by default', () => {
      expect(formatCurrency(100)).toBe('$100.00');
    });

    it('formats EUR correctly', () => {
      expect(formatCurrency(50.5, 'EUR')).toBe('€50.50');
    });

    it('formats GBP correctly', () => {
      expect(formatCurrency(10.25, 'GBP')).toBe('£10.25');
    });

    it('formats PLN with symbol at the end', () => {
      expect(formatCurrency(120.5, 'PLN')).toBe('120.50 zł');
    });

    it('formats JPY with symbol and amount', () => {
      const result = formatCurrency(1500, 'JPY');
      expect(result).toMatch(/^¥/);
      expect(result).toContain('1500');
    });

    it('falls back to $ for unknown currency codes', () => {
      expect(formatCurrency(10, 'XYZ')).toBe('$10.00');
    });

    it('handles zero amount', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });

    it('handles negative amounts', () => {
      expect(formatCurrency(-50, 'USD')).toBe('$-50.00');
    });
  });
});
