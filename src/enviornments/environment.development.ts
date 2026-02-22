// Development defaults. Use mock API and local endpoint.
export const environment = {
  production: false,
  apiBaseUrl: '/mock-api',
  features: {
    mockApi: true,
    enableCheckout: true,
    enableCms: true
  }
} as const;
