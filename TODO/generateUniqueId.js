// Function to generate a unique ID for each todo
const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export { generateUniqueId };
