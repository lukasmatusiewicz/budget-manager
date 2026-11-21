/**
 * Utility to trigger a file download in the browser
 * @param {string} content - The content of the file
 * @param {string} fileName - The name of the file to be saved
 * @param {string} contentType - The MIME type of the content
 */
export const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
};

const FORMULA_PREFIX_REGEX = /^[\t\r]|^[=+\-@]/;

/**
 * Neutralizes spreadsheet formula injection and escapes double quotes per RFC 4180.
 * Numeric values (including negative numbers like -42.5) are preserved without prefixing.
 * @param {unknown} value - Raw cell or header value
 * @returns {string} - Sanitized and RFC 4180 quote-escaped string (without outer quotes)
 */
const sanitizeAndEscapeField = (value) => {
  const raw = String(value ?? '');
  const trimmed = raw.trimStart();
  const isFormulaRisk =
    typeof value !== 'number' &&
    (FORMULA_PREFIX_REGEX.test(raw) || FORMULA_PREFIX_REGEX.test(trimmed));
  const neutralized = isFormulaRisk ? `'${raw}` : raw;
  return neutralized.replace(/"/g, '""');
};

const formatCSVCell = (value) => `"${sanitizeAndEscapeField(value)}"`;

const formatCSVHeader = (header) => {
  const escaped = sanitizeAndEscapeField(header);
  return /[,"\n\r]|^'/.test(escaped) ? `"${escaped}"` : escaped;
};

/**
 * Converts an array of objects to an RFC 4180 CSV string with formula-injection protection.
 * @param {Array<Object>} data - The data to convert
 * @returns {string} - The CSV formatted string
 */
export const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.map(formatCSVHeader).join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map((header) => formatCSVCell(row[header]));
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

/**
 * Exports transactions to a CSV file
 * @param {Array<Object>} transactions - The transactions to export
 */
export const exportTransactionsToCSV = (transactions) => {
  const csvContent = convertToCSV(transactions);
  const date = new Date().toISOString().split('T')[0];
  downloadFile(csvContent, `transactions_${date}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Exports transactions to a JSON file
 * @param {Array<Object>} transactions - The transactions to export
 */
export const exportTransactionsToJSON = (transactions) => {
  const jsonContent = JSON.stringify(transactions, null, 2);
  const date = new Date().toISOString().split('T')[0];
  downloadFile(jsonContent, `transactions_${date}.json`, 'application/json;charset=utf-8;');
};
