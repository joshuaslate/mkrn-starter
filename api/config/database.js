module.exports = () => {
  // Default to dev presets
  const dbConfig = {
    url: 'mongodb://localhost:27017',
    opts: {
      useMongoClient: true,
      autoReconnect: true,
      keepAlive: 300000,
    },
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

  return dbConfig;
};
