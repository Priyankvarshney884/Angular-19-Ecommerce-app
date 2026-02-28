// Production defaults. Angular CLI swaps this file in development mode.
export const environment = {
  production: true,
  apiBaseUrl: './mock-api',
  features: {
    mockApi: true,
    enableCheckout: true,
    enableCms: true
  }
} as const;
