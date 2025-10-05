# RainCheckAUS Deployment Guide

## Overview
This guide covers deploying the RainCheckAUS application to Render.com. The application consists of three main services:
- **Frontend**: React application
- **Backend**: Node.js/Express API
- **ML Model**: FastAPI/Python service

## Prerequisites
- Render.com account
- GitHub repository with the code
- OpenWeather API key

## Deployment Steps

### 1. Prepare Environment Variables

#### Backend Service
- `NODE_ENV`: production
- `PORT`: 5000 (auto-assigned by Render)
- `FASTAPI_URL`: https://raincheckaus.onrender.com
#### ML Model Service
- `MODEL_PATH`: /opt/render/project/src/ml-models/models/xgb_model.pkl
- `OPENWEATHER_API_KEY`: Your OpenWeather API key

#### Frontend Service
- `REACT_APP_BACKEND_URL`: https://raincheckaus.onrender_backend.com

### 2. Deploy Services on Render

#### Option A: Using Render Dashboard (Recommended)

1. **Deploy ML Model Service First**
   - Create new "Web Service" on Render
   - Connect your GitHub repository
   - Set build command: `cd ml-models && pip install -r api/requirements.txt`
   - Set start command: `cd ml-models/api && uvicorn main:app --host 0.0.0.0 --port 8000`
   - Add environment variables (see above)
   - Deploy

2. **Deploy Backend Service**
   - Create new "Web Service" on Render
   - Connect your GitHub repository
   - Set build command: `cd backend && npm ci --only=production`
   - Set start command: `cd backend && node app.js`
   - Add environment variables (update FASTAPI_URL with your ML service URL)
   - Deploy

3. **Deploy Frontend Service**
   - Create new "Static Site" on Render
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm ci && npm run build`
   - Set publish directory: `frontend/build`
   - Add environment variables (update REACT_APP_BACKEND_URL with your backend URL)
   - Deploy

#### Option B: Using Docker (Alternative)

1. **Deploy ML Model Service**
   - Create new "Web Service" on Render
   - Connect your GitHub repository
   - Set Dockerfile path: `ml-models/api/Dockerfile`
   - Add environment variables
   - Deploy

2. **Deploy Backend Service**
   - Create new "Web Service" on Render
   - Connect your GitHub repository
   - Set Dockerfile path: `backend/Dockerfile`
   - Add environment variables
   - Deploy

3. **Deploy Frontend Service**
   - Create new "Web Service" on Render
   - Connect your GitHub repository
   - Set Dockerfile path: `frontend/Dockerfile`
   - Add environment variables
   - Deploy

### 3. Update Service URLs

After deployment, update the environment variables in each service:

1. **Backend Service**: Update `FASTAPI_URL` to point to your ML service URL
2. **Frontend Service**: Update `REACT_APP_BACKEND_URL` to point to your backend service URL

### 4. Health Checks

All services include health check endpoints:
- Backend: `GET /health`
- ML Model: `GET /health`
- Frontend: Serves static files

### 5. Monitoring

Monitor your services through the Render dashboard:
- Check build logs for any issues
- Monitor service health
- Review application logs

## Dockerfile Optimizations

### Backend Dockerfile
- Uses Node.js 18 Alpine for smaller image size
- Runs as non-root user for security
- Uses `node` instead of `nodemon` for production
- Includes health check with curl

### ML Model Dockerfile
- Uses Python 3.11 slim for smaller image size
- Copies model and data files into container
- Includes curl for health checks
- Optimized for FastAPI deployment

### Frontend Dockerfile
- Multi-stage build for production optimization
- Uses NGINX to serve static files
- Minimal production image

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in package.json/requirements.txt
   - Verify file paths in Dockerfiles
   - Check for missing model/data files

2. **Service Communication**
   - Ensure URLs are correct (use https:// for Render services)
   - Check CORS settings
   - Verify environment variables

3. **Health Check Failures**
   - Ensure health check endpoints are accessible
   - Check that services are binding to 0.0.0.0
   - Verify port configurations

### Debugging

1. **Check Build Logs**
   - Review build output in Render dashboard
   - Look for missing dependencies or file errors

2. **Check Runtime Logs**
   - Monitor application logs in Render dashboard
   - Look for connection errors or missing environment variables

3. **Test Endpoints**
   - Use curl or Postman to test health endpoints
   - Verify service-to-service communication

## Security Considerations

1. **Environment Variables**
   - Never commit API keys to repository
   - Use Render's environment variable management
   - Rotate API keys regularly

2. **CORS Configuration**
   - Backend allows all origins (configure for production)
   - Consider restricting to specific domains

3. **Rate Limiting**
   - Consider implementing rate limiting for API endpoints
   - Monitor usage patterns

## Performance Optimization

1. **Caching**
   - Implement caching for weather data
   - Use CDN for static assets

2. **Database**
   - Consider adding database for user data
   - Implement data persistence

3. **Monitoring**
   - Set up application monitoring
   - Monitor API usage and performance
