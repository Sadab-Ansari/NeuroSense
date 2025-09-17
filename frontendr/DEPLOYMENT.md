# Deployment Guide for NeuroSense Frontend

## Environment Variables Setup

### Local Development

1. Create a `.env.local` file in the project root (this file is ignored by git)
2. Copy the template from `.env.local.template` and fill in your values:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_development_key_here
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=NeuroSense
```

### Vercel Production Deployment

#### Step 1: Access Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `frontendr` project
3. Navigate to **Settings** → **Environment Variables**

#### Step 2: Add Required Variables

Add these environment variables in Vercel:

| Variable Name                | Value                         | Environment                      |
| ---------------------------- | ----------------------------- | -------------------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_live_your_production_key` | Production, Preview              |
| `VITE_API_URL`               | `https://your-api-domain.com` | Production, Preview              |
| `VITE_APP_NAME`              | `NeuroSense`                  | Production, Preview, Development |

#### Step 3: Environment-Specific Values

- **Production**: Use your live Clerk publishable key (starts with `pk_live_`)
- **Preview**: Can use the same as production or a staging key
- **Development**: Not needed (use `.env.local` instead)

#### Step 4: Deploy

1. Push your code to your Git repository
2. Vercel will automatically deploy with the environment variables
3. If you update environment variables, trigger a new deployment

## Important Notes

### ✅ What You Should Do:

- Only configure environment variables in Vercel dashboard
- Use `.env.local` for local development only
- Never commit actual environment values to git

### ❌ What You Should NOT Do:

- Don't upload `.env` files to Vercel
- Don't commit `.env.local` or any file with actual secrets
- Don't use `NEXT_PUBLIC_` prefix (this is for Next.js, not Vite)

### 🔧 Troubleshooting

If environment variables aren't working:

1. Check the variable names have `VITE_` prefix
2. Verify they're set in the correct environment (Production/Preview)
3. Trigger a new deployment after adding variables
4. Check the build logs in Vercel for any errors

### 📁 File Structure

```
frontendr/
├── .env.example          # Template for all developers
├── .env.local.template   # Local development template
├── .env.local           # Your local values (git-ignored)
└── src/lib/env.ts       # Centralized env management
```

Only `.env.local` should contain actual values, and it's automatically ignored by git.
