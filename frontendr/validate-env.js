#!/usr/bin/env node

// Simple environment validation script
// Run with: node validate-env.js

const requiredVars = ["VITE_CLERK_PUBLISHABLE_KEY"];

const optionalVars = ["VITE_API_URL", "VITE_APP_NAME"];

console.log("🔍 Validating Environment Variables...\n");

let hasErrors = false;

// Check required variables
console.log("✅ Required Variables:");
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: MISSING`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
  }
});

// Check optional variables
console.log("\n📋 Optional Variables:");
optionalVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName}: Not set (optional)`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

console.log("\n" + "=".repeat(50));

if (hasErrors) {
  console.log("❌ Environment validation failed!");
  console.log("📝 Create a .env.local file with the missing variables.");
  console.log("📖 See DEPLOYMENT.md for setup instructions.");
  process.exit(1);
} else {
  console.log("✅ Environment validation passed!");
  console.log("🚀 Ready for development/deployment.");
}
