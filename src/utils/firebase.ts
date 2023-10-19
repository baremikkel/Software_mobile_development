import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCidJT1lq5tWRcBlSTMCQkPAbGQBTgUf8A',
  authDomain: 'car-app-c512e.firebaseapp.com',
  projectId: 'car-app-c512e',
  storageBucket: 'car-app-c512e.appspot.com',
  messagingSenderId: '895079497353',
  appId: '1:895079497353:web:517179b4dcb2564c585058',
  measurementId: 'G-9RHDLRLJJC'
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
