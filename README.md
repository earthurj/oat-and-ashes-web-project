# OAT & ASHES — Specialty Coffee & Tea Shop

A Vue 3 e-commerce app for a cozy specialty coffee & tea roastery. Built with Firebase Realtime Database, Vuex state management, and Firebase Authentication.

---

## Features

- 🛍️ Browse coffee beans, loose leaf tea, matcha & brewing equipment
- 🔐 User registration & login (email/password)
- ✏️ Full CRUD on products (authenticated users)
- 🛒 Shopping cart with localStorage persistence
- ❤️ Wishlist
- 📦 Order confirmation
- 🛡️ Protected routes (add/edit behind auth)
- 📱 Fully responsive

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| State | Vuex 4 |
| Routing | Vue Router 4 |
| Styling | Tailwind CSS 3 |
| Database | Firebase Realtime Database |
| Auth | Firebase Authentication |
| Build | Vite |

---

## Firebase Setup Guide

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add project** → name it (e.g. `oat-and-ashes`)
3. Enable Google Analytics (optional) → **Create project**

### 2. Enable Authentication

1. In Firebase Console, go to **Build → Authentication**
2. Click **Get started**
3. Under **Sign-in method**, click **Email/Password**
4. Toggle **Enable** → **Save**

### 3. Enable Realtime Database

1. Go to **Build → Realtime Database**
2. Click **Create Database**
3. Choose a location (e.g. `asia-southeast1`)
4. Start in **test mode** (you can tighten rules later)

### 4. Get Your Config

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **Your apps** → click **Web app** (</>)
3. Register app (nickname: `oat-and-ashes-web`)
4. Copy the `firebaseConfig` object

### 5. Paste Config

Open `src/firebase/config.js` and replace the placeholder with your config:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
}
```

### 6. Run the App

```bash
cd vue-ecommerce
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

---

## Default Realtime Database Rules (Development)

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> ⚠️ For production, restrict write access to authenticated users only.

---

## Project Structure

```
src/
├── firebase/config.js        # Firebase init
├── store/
│   ├── index.js              # Vuex store root
│   └── modules/
│       ├── auth.js           # Auth state, login, register, logout
│       ├── products.js       # Product CRUD, realtime sync
│       ├── cart.js           # Cart with localStorage persistence
│       └── wishlist.js       # Wishlist with localStorage persistence
├── router/index.js           # Routes + auth navigation guards
├── views/
│   ├── HomeView.vue          # Landing page with hero
│   ├── ProductsView.vue      # Product catalog with category filter
│   ├── ProductDetailView.vue # Single product with specs
│   ├── AddProductView.vue    # Add new product (protected)
│   ├── EditProductView.vue   # Edit existing (protected)
│   ├── LoginView.vue         # Sign in
│   ├── RegisterView.vue      # Create account
│   ├── CartView.vue          # Shopping cart
│   ├── OrderConfirmationView.vue  # Checkout confirmation
│   ├── WishlistView.vue      # Saved products
│   └── NotFoundView.vue      # 404
└── components/
    ├── Navbar.vue            # Top navigation
    ├── HeroBanner.vue        # Homepage hero
    ├── ProductCard.vue       # Product grid card
    ├── ProductForm.vue       # Reusable add/edit form
    ├── CartItem.vue          # Cart row
    └── LoadingSpinner.vue    # Loading indicator
```

---

## Product Categories & Fields

| Category | Fields |
|----------|--------|
| Coffee Beans | name, origin, roast (Light/Medium/Dark), type (Single Origin/Blend/Espresso/Decaf), weight, price, description, image |
| Loose Leaf Tea | name, origin, type (Black/Green/Oolong/White/Herbal), weight, price, description, image |
| Matcha | name, origin, weight, price, description, image |
| Brewing Equipment | name, price, description, image |
| Merchandise | name, price, description, image |
