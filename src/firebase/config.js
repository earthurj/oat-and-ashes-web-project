import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDmA-2f9Pk-fgJa_Tik5pMh-MX8odGcCuo",
  authDomain: "coffee-tea-shop-364c7.firebaseapp.com",
  databaseURL: "https://coffee-tea-shop-364c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coffee-tea-shop-364c7",
  storageBucket: "coffee-tea-shop-364c7.firebasestorage.app",
  messagingSenderId: "194097699562",
  appId: "1:194097699562:web:7e571d213104ca7be61593"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getDatabase(app)
export default app
