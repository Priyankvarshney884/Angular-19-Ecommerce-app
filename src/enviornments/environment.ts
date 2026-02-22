// Production defaults. Angular CLI swaps this file in development mode.
export const environment = {
  production: true,
  apiBaseUrl: '/api',
  features: {
    mockApi: false,
    enableCheckout: true,
    enableCms: true
  }
} as const;
