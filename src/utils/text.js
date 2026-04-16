const numberSeparator = (number, decimal) => number.toLocaleString('en-US', { minimumFractionDigits: decimal, maximumFractionDigits: decimal });

module.exports = { numberSeparator };