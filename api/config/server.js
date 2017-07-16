module.exports = () => {
  // Default to dev presets
  const serverConfig = {
    port: 3000,
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

  return serverConfig;
};
