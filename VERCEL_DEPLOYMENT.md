# Vercel Deployment Guide

## Deployment Steps

1. **Set up Environment Variables in Vercel Dashboard**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add the following variable:
     - Name: `DATABASE_URL`
     - Value: Your PostgreSQL connection string

2. **Run Database Migrations**
   Since Vercel is a serverless platform, you need to run database migrations manually:
   ```bash
   npx prisma migrate deploy
   ```

3. **Deploy to Vercel**
   - Push your changes to GitHub
   - Vercel will automatically deploy your application
   - The API routes in the `api/` directory will be automatically converted to serverless functions

## How It Works

This project is configured to work with Vercel's serverless architecture:

- **Frontend**: React application is built and served as static files
- **Backend**: API routes in the `api/` directory are automatically converted to serverless functions
- **Database**: PostgreSQL database is connected through Prisma ORM

## Vercel Configuration

The `vercel.json` file configures:
- Serverless function builds for TypeScript files in the `api/` directory
- Routing rules to direct API requests to serverless functions
- Environment variable mapping

## Troubleshooting

### If tablets still aren't loading:

1. **Check Environment Variables**
   - Ensure `DATABASE_URL` is correctly set in Vercel environment variables
   - Verify the database connection string is correct

2. **Check Vercel Function Logs**
   - Go to your Vercel dashboard
   - Navigate to the Functions tab
   - Check for any errors in the serverless function logs

3. **Verify Database Connectivity**
   - Test your database connection string locally
   - Ensure your database accepts connections from Vercel's IP addresses

4. **Run Migrations**
   - Make sure you've run `npx prisma migrate deploy` to set up your database schema

### Common Issues

1. **CORS Errors**
   - The serverless functions include CORS headers to allow requests from your frontend

2. **Database Connection Failures**
   - Ensure your PostgreSQL database is accessible from the internet
   - Some database providers require whitelisting Vercel's IP addresses

3. **Missing Environment Variables**
   - Check that all required environment variables are set in the Vercel dashboard

## Testing Your Deployment

After deployment, you can test your API endpoints directly:

1. **Get all tablets**: `GET https://your-domain.vercel.app/api/tablets`
2. **Get specific tablet**: `GET https://your-domain.vercel.app/api/tablets/{id}`
3. **Health check**: The serverless functions will log connection status

If these endpoints return data correctly, the issue is likely in the frontend configuration.