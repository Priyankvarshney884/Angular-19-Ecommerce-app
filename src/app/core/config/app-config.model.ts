export interface FeatureFlags {
  mockApi: boolean;
  enableCheckout: boolean;
  enableCms: boolean;
}

// Typed application configuration available through DI.
export interface AppConfig {
  production: boolean;
  apiBaseUrl: string;
  features: FeatureFlags;
}
