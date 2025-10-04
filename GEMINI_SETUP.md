# Google Gemini API Setup Guide

## 🆓 Free Google Gemini API Setup

### Step 1: Get Your Free API Key

1. **Visit Google AI Studio**: Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

2. **Sign in**: Use your Google account to sign in

3. **Create API Key**: Click "Create API Key" button

4. **Copy the Key**: Save your API key securely

### Step 2: Configure the Application

1. **Open the .env file** in the `Backened` folder:
   ```
   D:\fakenewsapp\Backened\.env
   ```

2. **Replace the placeholder** with your actual API key:
   ```
   GEMINI_API_KEY=your-actual-gemini-api-key-here
   DEBUG=True
   ```

### Step 3: Test the Setup

1. **Start the backend**:
   ```cmd
   cd D:\fakenewsapp\Backened
   python run_server.py
   ```

2. **Start the frontend**:
   ```cmd
   cd D:\fakenewsapp\Frontened\Hackathon-main\Hackathon-main
   npm start
   ```

3. **Test the analysis**: Try analyzing some text in the dashboard

## 🔑 API Key Security

- **Never commit** your API key to version control
- **Keep it private** and don't share it publicly
- **Regenerate** if you suspect it's been compromised

## 📊 Free Tier Limits

Google Gemini offers generous free tier limits:
- **15 requests per minute**
- **1 million tokens per day**
- **No credit card required**

## 🚨 Troubleshooting

### Common Issues:

1. **"API key not set" error**:
   - Check your .env file has the correct key
   - Restart the backend server after adding the key

2. **"Quota exceeded" error**:
   - You've hit the rate limit, wait a minute and try again
   - Check your usage in Google AI Studio

3. **"Invalid API key" error**:
   - Verify the key is correct
   - Make sure there are no extra spaces or characters

## ✅ Success Indicators

When everything is working correctly, you should see:
- Backend starts without API key warnings
- Frontend can analyze text successfully
- Analysis results show detailed breakdowns
- No "API connection failed" messages

## 🆘 Need Help?

If you encounter issues:
1. Check the backend logs for error messages
2. Verify your API key is correctly set
3. Ensure you have an active internet connection
4. Check Google AI Studio for any service status updates
