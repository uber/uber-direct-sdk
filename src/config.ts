export type Environment = 'production' | 'sandbox';

export interface ClientOptions {
  /**
   * The environment to use for API requests.
   * - 'production': api.uber.com (default)
   * - 'sandbox': api-sandbox.uber.com
   */
  environment?: Environment;
}

export const getBaseURL = (environment: Environment = 'production'): string => {
  return environment === 'sandbox'
    ? 'https://sandbox-api.uber.com'
    : 'https://api.uber.com';
};
