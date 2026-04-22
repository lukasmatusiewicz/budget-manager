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

/**
 * Converts an array of objects to a CSV string
 * @param {Array<Object>} data - The data to convert
 * @returns {string} - The CSV formatted string
 */
export const convertToCSV = (data) => {
  if (!data || data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const escaped = ('' + (row[header] || '')).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
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
