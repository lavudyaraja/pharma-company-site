# Troubleshooting Tablet Fetching Issues

## Problem
After deploying the project, you're unable to fetch tablets. This is typically related to database connectivity issues.

## Root Causes and Solutions

### 1. Missing Database Environment Variable

**Issue**: The `DATABASE_URL` environment variable is not set in your deployment environment.

**Solution**:
1. Create a `.env` file in your project root with your PostgreSQL connection string:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database_name
   ```

2. If deploying to a cloud platform (Vercel, Render, etc.), set the `DATABASE_URL` as an environment variable in your deployment settings.

### 2. Database Not Accessible

**Issue**: The database server is not running or not accessible from your deployment environment.

**Solution**:
1. Ensure your PostgreSQL database is running
2. Check that the database is accessible from your deployment environment
3. Verify firewall settings allow connections to your database port

### 3. Missing Database Schema

**Issue**: The database tables haven't been created or migrated.

**Solution**:
1. Run database migrations:
   ```bash
   npx prisma migrate deploy
   ```

### 4. CORS Issues

**Issue**: Cross-Origin Resource Sharing restrictions prevent API calls.

**Solution**:
Check the server configuration in `server.ts` and ensure your frontend domain is included in the CORS origins:
```javascript
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'YOUR_DEPLOYED_URL_HERE'],
  credentials: true
}));
```

## Debugging Steps

1. **Check server logs**: Look for database connection errors or API route errors
2. **Test API endpoint directly**: Try accessing `/api/tablets` directly in your browser
3. **Verify database connectivity**: Use a database client to ensure you can connect with your connection string
4. **Check environment variables**: Ensure all required environment variables are set

## Common Deployment Platforms

### Vercel
1. Go to your project settings
2. Navigate to Environment Variables
3. Add `DATABASE_URL` with your PostgreSQL connection string

### Render
1. Go to your service settings
2. Navigate to Environment Variables
3. Add `DATABASE_URL` with your PostgreSQL connection string

### Railway
1. Go to your project variables
2. Add `DATABASE_URL` with your PostgreSQL connection string

## Testing Your Fix

1. After setting the environment variable, redeploy your application
2. Check the server logs for successful database connection messages
3. Try accessing the tablets page again
4. Open browser developer tools and check for any errors in the console or network tab

## Additional Help

If you're still experiencing issues:

1. Check the server console for error messages
2. Verify your database credentials are correct
3. Ensure your database provider allows connections from your deployment platform
4. Consider using a managed database service like Supabase, Neon, or Railway for easier deployment