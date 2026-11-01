'use client';

/**
 * Indian Rupee (₹) currency formatter for PawCalm e-commerce store.
 * Uses locale 'en-IN' for correct Indian number grouping (lakhs, crores).
 * 
 * @param {number | string} amount - The amount to format (will be parsed as number)
 * @param {object} [options] - Formatting options
 * @param {boolean} [options.decimalPlaces=2] - Number of decimal places
 * @returns {string} Formatted Indian currency string (e.g., "₹1,299.00" or "₹1.29 Lakhs")
 */
export const formatCurrency = (amount, options = {}) => {
  const { decimalPlaces = 2 } = options;
  
  if (amount === undefined || amount === null || amount === '') {
    return '₹0.00';
  }
  
  const numericAmount = Number(amount);
  
  if (isNaN(numericAmount)) {
    return '₹0.00';
  }
  
  // Use Indian Number Format (en-IN locale)
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  });
  
  return formatter.format(numericAmount);
};

/**
 * Calculate discount percentage from MRP and selling price
 * 
 * @param {number | string} mrp - Maximum Retail Price
 * @param {number | string} price - Selling price
 * @returns {number | null} Discount percentage, or null if cannot calculate
 */
export const calculateDiscountPercentage = (mrp, price) => {
  const mrpNum = Number(mrp);
  const priceNum = Number(price);
  
  if (isNaN(mrpNum) || isNaN(priceNum) || mrpNum <= 0) {
    return null;
  }
  
  if (priceNum >= mrpNum) {
    return 0; // No discount or priced at MRP
  }
  
  const discount = ((mrpNum - priceNum) / mrpNum) * 100;
  return Math.round(discount * 100) / 100; // Round to 2 decimal places
};

/**
 * Format price without currency symbol (for comparisons, calculations)
 * 
 * @param {number | string} amount - The amount to format as number
 * @returns {number} Parsed number value
 */
export const parsePrice = (amount) => {
  if (amount === undefined || amount === null || amount === '') {
    return 0;
  }
  return Number(amount);
};

export default formatCurrency;