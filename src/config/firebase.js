/**
 * config/firebase.js
 *
 * Client-side Firebase configuration and initialization.
 * Reads environment variables configured via Vite (VITE_FIREBASE_*).
 */

import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Check if credentials are provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
)

let app = null
let auth = null

if (isFirebaseConfigured) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(app)
} else {
  console.warn(
    '⚠️ Firebase client credentials not configured. Please set VITE_FIREBASE_* variables in .env'
  )
}

export { app, auth }
