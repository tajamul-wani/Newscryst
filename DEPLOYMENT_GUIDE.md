# 🚀 Deployment Guide - NewsCryst on Netlify

## Overview
This guide walks you through deploying NewsCryst to Netlify with your API key securely managed.

## Pre-Deployment Checklist

- [ ] All code changes committed
- [ ] `.env.local` is NOT committed (should be in .gitignore)
- [ ] `.env.local` has your working API key for local testing
- [ ] `npm run build` completes successfully
- [ ] `npm run dev` works locally

## Step 1: Prepare Your Repository

### 1.1 Verify .gitignore
Ensure `.env.local` is in `.gitignore`:
```bash
# This should be in .gitignore
.env.local
.env.*.local
```

### 1.2 Commit Everything (Except .env.local)
```bash
git add .
git commit -m "feat: Add enhanced NewsCryst features and deployment config"
git push origin main
```

**IMPORTANT**: Never commit `.env.local` with your real API key!

## Step 2: Setup Netlify

### Option A: Using Netlify Dashboard (Recommended)

1. **Go to Netlify**
   - Visit [netlify.com](https://www.netlify.com)
   - Sign up or log in with GitHub/GitLab/Bitbucket

2. **Connect Repository**
   - Click "New site from Git"
   - Select your Git provider
   - Authorize Netlify
   - Choose your repository
   - Select the branch (usually `main`)

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Keep Node version at 18 or higher

4. **Set Environment Variables**
   - Click "Site settings"
   - Go to "Build & deploy" → "Environment"
   - Click "Edit variables"
   - Add new variable:
     - Key: `VITE_NEWS_API`
     - Value: `your_newsapi_key_here`
   - Save

5. **Deploy**
   - Netlify will automatically build and deploy
   - Your site is now live!
   - URL format: `https://[site-name].netlify.app`

### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

When prompted, set the build command to `npm run build` and publish directory to `dist`.

## Step 3: Verify Deployment

### 3.1 Check Site is Live
- Visit your Netlify URL
- Test category switching
- Test search functionality
- Test favorites (should persist)
- Toggle dark mode

### 3.2 Verify API Key is Working
- News articles should load successfully
- No console errors about missing API key
- Check Netlify logs for any issues:
  - Netlify Dashboard → Deploys → Deploy logs

### 3.3 Monitor API Usage
- Go to [NewsAPI.org Dashboard](https://newsapi.org/account)
- Monitor your API request count
- Ensure you're within rate limits

## Step 4: Post-Deployment (Optional)

### 4.1 Setup Custom Domain
1. In Netlify dashboard, go to "Site settings"
2. Click "Domain management"
3. "Add custom domain"
4. Follow DNS configuration steps

### 4.2 Enable HTTPS (Automatic)
- Netlify automatically provides SSL/TLS
- All sites use HTTPS by default

### 4.3 Setup Branch Deploys
1. Go to "Site settings" → "Build & deploy" → "Deploy contexts"
2. Enable branch deploys for staging
3. Every branch push will create a preview

## Security Best Practices

### ✅ DO:
- Use Netlify environment variables for API keys
- Keep `.env.local` only on your local machine
- Use a demo/limited API key if the project is public
- Monitor API usage regularly
- Rotate API keys periodically

### ❌ DON'T:
- Commit `.env.local` to GitHub
- Share your `.env.local` file
- Use production API keys for demo sites
- Expose API keys in frontend code comments
- Upload API keys to public repositories

## Troubleshooting

### Issue: Build Fails
**Solution:**
- Check Netlify build logs
- Ensure `npm run build` works locally
- Verify all dependencies are in package.json
- Check Node version compatibility

### Issue: 404 on Routes
**Solution:**
- Already configured in `netlify.toml`
- If still having issues, verify `netlify.toml` is in root directory

### Issue: API Returns Errors
**Solution:**
- Verify `VITE_NEWS_API` environment variable is set
- Test API key on NewsAPI.org website
- Check API rate limits haven't been exceeded
- Verify internet connection works

### Issue: Favorites Not Persisting
**Solution:**
- Browser localStorage is working (test in dev tools)
- Clear browser cache and try again
- Different domains have separate localStorage

### Issue: Stuck on Loading
**Solution:**
- Check browser console for errors
- Verify API key is valid
- Check internet connection
- Try refreshing the page

## Updating Your Site

### To Update Code:
```bash
git add .
git commit -m "Update message"
git push origin main
```
Netlify will automatically detect changes and redeploy.

### To Update API Key:
1. Go to Netlify dashboard
2. Site settings → Build & deploy → Environment
3. Update `VITE_NEWS_API` value
4. Trigger a new deploy: Click "Trigger deploy" or push a commit

## Monitoring & Maintenance

### Weekly:
- [ ] Check Netlify analytics
- [ ] Verify site loads without errors
- [ ] Monitor API request count

### Monthly:
- [ ] Review performance metrics
- [ ] Check for dependency updates: `npm outdated`
- [ ] Update security patches: `npm audit fix`

### Quarterly:
- [ ] Consider rotating API keys
- [ ] Review and optimize build process
- [ ] Check Netlify deployment logs

## Need Help?

- **Netlify Support**: [docs.netlify.com](https://docs.netlify.com)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **NewsAPI Docs**: [newsapi.org](https://newsapi.org/docs)
- **React Docs**: [react.dev](https://react.dev)

---

**Happy Deploying! 🚀**
