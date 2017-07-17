module.exports = () => {
  // Default to dev presets
  const emailConfig = {
    apiKey: 'test',
    domain: 'test',
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

  return emailConfig;
};
