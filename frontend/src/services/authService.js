// Authentication Service Layer
// Uses Firebase Authentication on client and synchronizes with the Express/MongoDB backend

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/config/firebase'

const API_URL = import.meta.env.VITE_API_URL 
export async function login(credentials) {
  if (isFirebaseConfigured && auth) {
    const cred = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    return { success: true, user: cred.user }
  }
  // Graceful fallback for local development before Firebase keys are set
  return { success: true, user: { name: 'Demo User', email: credentials.email } }
}

export async function register(payload) {
  if (isFirebaseConfigured && auth) {
    const cred = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
    try {
      const token = await cred.user.getIdToken()
      await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: payload.name, email: payload.email }),
      })
    } catch (err) {
      console.warn('Backend user registration sync failed:', err.message)
    }
    return { success: true, user: cred.user }
  }
  return { success: true, user: { name: payload.name, email: payload.email } }
}

export async function logout() {
  if (auth) {
    await signOut(auth)
  }
  return { success: true }
}
