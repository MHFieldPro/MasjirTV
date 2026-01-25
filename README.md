<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1XNF4BVq8bwYPrAfWoHUrmO1NJXbQbsNU

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
"# MasjirTV" 
## Deploy to Netlify

**Netlify Build Settings:**

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Configuration file:** `netlify.toml`

**Steps:**
1. Push your code to GitHub (or your preferred Git provider).
2. Go to [Netlify](https://app.netlify.com/) and create a new site from your repo.
3. Netlify will auto-detect Vite and use the correct build settings.
4. If needed, set environment variables (e.g., `GEMINI_API_KEY`) in Netlify's dashboard.
5. Deploy!
