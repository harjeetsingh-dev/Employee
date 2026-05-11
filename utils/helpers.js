// Helper Utility Functions

// Validate email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate required fields
const validateRequiredFields = (data, requiredFields) => {
  for (let field of requiredFields) {
    if (!data[field]) {
      return { valid: false, message: `${field} is required` };
    }
  }
  return { valid: true };
};

// Generate unique ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  validateEmail,
  validateRequiredFields,
  generateId
};
