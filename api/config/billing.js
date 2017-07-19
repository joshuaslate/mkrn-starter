module.exports = () => {
  // Default to dev presets
  const billingConfig = {
    stripeApiKey: 'your-key',
  };

  switch (process.env.NODE_ENV) {
    case 'production':
      break;
    case 'stage':
      break;
    case 'dev':
    default:
      break;
  }

  return billingConfig;
};
