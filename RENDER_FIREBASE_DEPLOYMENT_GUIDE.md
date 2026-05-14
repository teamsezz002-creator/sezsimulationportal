# Architecture & Deployment Guide: Firebase + Render

To split your architecture so that the frontend portal is hosted on **Firebase Hosting** and the backend building process runs via a Node.js server on **Render**, follow these steps:

## Step 1: Deploy Backend to Render

Your `server.ts` handles the zip extractions, hosting of simulations (`/virtual-games`), and the React project building process (`/api/build-react`). It needs to be deployed continuously.

1. Push your code to a GitHub repository.
2. Log into [Render](https://render.com/) and click **New > Web Service**.
3. Select your GitHub repository.
4. Set the following details:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Click **Create Web Service**. 
6. Render will provide you with a hosted URL (e.g., `https://sezsimulationworld.onrender.com`).

## Step 2: Set your Render URL in the Frontend

Now that your building backend is located on Render, you must tell the frontend where to find it.

1. In your AI Studio project (or locally), open the `.env` or `.env.local` file (create one if it doesn't exist).
2. Add your Render backend URL like this:
   ```env
   VITE_BACKEND_URL="https://sezsimulationworld.onrender.com"
   ```
3. Your React frontend uses `import.meta.env.VITE_BACKEND_URL` in `Player.tsx` and `SimulationEditor.tsx` to directly send the ZIP files for building on Render, returning the URLs into your Firebase app seamlessly!

## Step 3: Deploy Frontend to Firebase Hosting

Now you deploy the portal itself to Firebase.

1. Ensure you have the Firebase CLI installed on your computer (`npm install -g firebase-tools`).
2. Log in with `firebase login`.
3. In your project directory, run `firebase init hosting`.
4. Select your existing Firebase project (`sezsimulationworld`).
5. Set your public directory to `dist`:
   - What do you want to use as your public directory? **dist**
   - Configure as a single-page app (rewrite all urls to /index.html)? **Yes**
   - Set up automatic builds and deploys with GitHub? **Optional (No for now)**
6. Build your React app:
   ```bash
   npm run build
   ```
7. Finally, deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

## Complete Workflow summary

- **Simulation Portal (React Web App):** Lives at `https://sezsimulationworld.web.app` (Firebase). It gives the user interface, renders simulations, and stores metadata in Firestore.
- **Simulation Builder & Extractor (Node Server):** Lives at `https://your-app.onrender.com`. When users upload raw ZIP files in the portal, the portal sends the file to Render. Render runs the build, zips it, and uploading/processing happens seamlessly. The `Player.tsx` talks to Render to extract the compiled simulation and displays it inside the portal using an iframe.
