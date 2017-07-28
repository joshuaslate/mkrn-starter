
/**
 * getEnvironment - Returns the current environment, or development by default
 * @returns {String}
 */
export const getEnvironment = () => process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';


/**
 * getApiUrl  - Returns the URL for the api, given the current environment
 * @returns {String}
 */
export const getApiUrl = () => {
  switch (getEnvironment()) {
    case 'production':
      return 'http://api.mkrn-domain.com';
    case 'stage':
      return 'http://api-stage.mkrn-stage-domain.com';
    case 'test':
      return 'http://api-test.mkrn-test-domain.com';
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};


/**
 * getAppUrl  - Returns the URL for the app, given the environment
 * @returns {String}
 */
export const getAppUrl = () => {
  switch (getEnvironment()) {
    case 'production':
      return 'http://app.mkrn-domain.com';
    case 'stage':
      return 'http://app-stage.mkrn-stage-domain.com';
    case 'test':
      return 'http://app-test.mkrn-test-domain.com';
    case 'development':
    default:
      return 'http://localhost:8080';
  }
};
