/**
 * context/AuthContext.jsx
 *
 * Provides customer and admin authentication state to the entire HAMAR frontend.
 * Uses Firebase Authentication for authentication sessions and synchronizes
 * application profile data with the MongoDB backend.
 */

import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onIdTokenChanged,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/config/firebase'

const AuthContext = createContext(null)
const API_URL = import.meta.env.VITE_API_URL 

async function fetchBackendProfile(firebaseUser) {
  const idToken = await firebaseUser.getIdToken()
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${idToken}` },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message || 'Could not verify this account with the HAMAR API.')
  }
  return { idToken, profile: payload.data }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to Firebase ID token changes & session persistence
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser)
        setLoading(true)
        setUserProfile(null)
        try {
          const { idToken, profile } = await fetchBackendProfile(firebaseUser)
          setToken(idToken)
          setUserProfile(profile)
        } catch (err) {
          console.warn('Failed to sync profile from backend:', err.message)
          setToken(null)
          setUserProfile({
            name: firebaseUser.displayName || 'Customer',
            email: firebaseUser.email,
            role: 'customer',
          })
        }
      } else {
        setCurrentUser(null)
        setUserProfile(null)
        setToken(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Login with Email & Password
  const login = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      // Graceful fallback for local development if Firebase keys aren't added yet
      const demoUser = { name: 'Demo Customer', email, role: 'customer' }
      setCurrentUser(demoUser)
      setUserProfile(demoUser)
      return { user: demoUser }
    }
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred
  }

  const adminLogin = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Admin sign-in requires configured Firebase Authentication.')
    }
    const credential = await signInWithEmailAndPassword(auth, email, password)
    try {
      const { idToken, profile } = await fetchBackendProfile(credential.user)
      if (profile.role !== 'admin') {
        throw new Error('This Firebase account is not authorized as a HAMAR administrator.')
      }
      setCurrentUser(credential.user)
      setToken(idToken)
      setUserProfile(profile)
      setLoading(false)
      return credential
    } catch (error) {
      await signOut(auth)
      setCurrentUser(null)
      setUserProfile(null)
      setToken(null)
      setLoading(false)
      throw error
    }
  }

  // Register new account with Firebase and sync with backend
  const register = async (name, email, password) => {
    if (!isFirebaseConfigured || !auth) {
      const demoUser = { name, email, role: 'customer' }
      setCurrentUser(demoUser)
      setUserProfile(demoUser)
      return { user: demoUser }
    }

    const cred = await createUserWithEmailAndPassword(auth, email, password)
    await updateFirebaseProfile(cred.user, { displayName: name })

    // Sync into backend MongoDB
    try {
      const idToken = await cred.user.getIdToken()
      await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name, email }),
      })
    } catch (err) {
      console.warn('Error syncing registration to backend:', err.message)
    }

    return cred
  }

  // Logout
  const logout = async () => {
    if (auth) {
      await signOut(auth)
    }
    setCurrentUser(null)
    setUserProfile(null)
    setToken(null)
  }

  // Password Reset
  const resetPassword = async (email) => {
    if (!auth) throw new Error('Firebase authentication is not configured.')
    return sendPasswordResetEmail(auth, email)
  }

  const value = {
    currentUser,
    userProfile,
    token,
    loading,
    login,
    adminLogin,
    register,
    logout,
    resetPassword,
    isAdmin: userProfile?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context || {}
}
