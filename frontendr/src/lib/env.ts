// Environment variable utilities for Vite
// In Vite, use import.meta.env instead of process.env

export const env = {
  // Clerk configuration
  CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  
  // App configuration
  NODE_ENV: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // Custom environment variables (add as needed)
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME || 'NeuroSense',
} as const;

// Helper function to check if we're in development
export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

// Validation helper
export const validateEnv = () => {
  const missingVars: string[] = [];
  
  if (!env.CLERK_PUBLISHABLE_KEY) {
    missingVars.push('VITE_CLERK_PUBLISHABLE_KEY');
  }
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};