/**
 * Velvet Terroir - Firebase Services Integration
 * Configured for project: coffee-d000d
 * Real-time order reception, status updates, and Firestore sync.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

// User's Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAGniquIj2-8oygX_zaIGRuRLdAh5RbZ0",
  authDomain: "coffee-d000d.firebaseapp.com",
  projectId: "coffee-d000d",
  storageBucket: "coffee-d000d.firebasestorage.app",
  messagingSenderId: "1068045188869",
  appId: "1:1068045188869:web:b5bb62a2ff8c5c1cce416c",
  measurementId: "G-TTDZ3BLG60"
};

// Initialize Core App
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (safely handles local file:// or sandbox limitations)
export let analytics = null;
try {
  if (typeof window !== 'undefined' && (location.protocol === 'http:' || location.protocol === 'https:')) {
    analytics = getAnalytics(app);
    console.log("🔥 Firebase Analytics initialized successfully.");
  }
} catch (err) {
  console.warn("Firebase Analytics requires http/https protocol:", err.message);
}

// Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Log Analytics Event safely
 */
export function trackEvent(eventName, params = {}) {
  try {
    if (analytics) {
      logEvent(analytics, eventName, params);
      console.log(`📊 [Analytics Event]: ${eventName}`, params);
    }
  } catch (err) {
    console.warn("Analytics event error:", err);
  }
}

/**
 * Save Order to Firestore collection 'orders'
 */
export async function saveOrder(orderData) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      status: orderData.status || "new",
      createdAt: serverTimestamp()
    });
    console.log("✅ Order recorded in Firebase Firestore with ID:", docRef.id);
    trackEvent("purchase", {
      transaction_id: orderData.orderId,
      value: orderData.total,
      currency: "USD",
      items: orderData.items
    });
    return { success: true, docId: docRef.id };
  } catch (err) {
    console.error("Firestore Order Saving Error (check Firestore rules if permission denied):", err);
    return { success: false, error: err.message };
  }
}

/**
 * Subscribe to Orders in real-time (for Dashboard)
 */
export function subscribeToOrders(callback) {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ docId: doc.id, ...doc.data() });
      });
      callback(orders);
    }, (err) => {
      console.warn("Firestore snapshot access warning (dashboard will use local storage fallback):", err);
    });
  } catch (err) {
    console.warn("subscribeToOrders initialization error:", err);
    return () => {};
  }
}

/**
 * Update Order Status in Firestore
 */
export async function updateOrderStatus(docId, newStatus) {
  try {
    const orderRef = doc(db, "orders", docId);
    await updateDoc(orderRef, { status: newStatus });
    console.log(`✅ Order ${docId} status updated to ${newStatus}`);
    return { success: true };
  } catch (err) {
    console.error("updateOrderStatus Firestore error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete Order in Firestore
 */
export async function deleteOrder(docId) {
  try {
    await deleteDoc(doc(db, "orders", docId));
    console.log(`🗑️ Order ${docId} deleted from Firestore`);
    return { success: true };
  } catch (err) {
    console.error("deleteOrder Firestore error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Save Newsletter Subscriber
 */
export async function saveSubscriber(email) {
  try {
    const docRef = await addDoc(collection(db, "subscribers"), {
      email: email,
      source: "website_footer",
      subscribedAt: serverTimestamp()
    });
    return { success: true, docId: docRef.id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Save Cupping Review
 */
export async function saveReview(reviewData) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      ...reviewData,
      createdAt: serverTimestamp()
    });
    return { success: true, docId: docRef.id };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Google Sign-In with Firebase Auth
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (window.showToast) {
      window.showToast(`مرحباً بك مجدداً، ${user.displayName || 'ضيفنا الكريم'}!`);
    }
    return user;
  } catch (err) {
    console.error("Firebase Login Error:", err);
    if (window.showToast) {
      window.showToast("تسجيل الدخول متاح من خلال الحساب التجاري");
    }
    return null;
  }
}

/**
 * Sign Out
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    if (window.showToast) {
      window.showToast("تم تسجيل الخروج بنجاح");
    }
  } catch (err) {
    console.error("Logout Error:", err);
  }
}

// Global window exposure
if (typeof window !== 'undefined') {
  window.FirebaseService = {
    app,
    db,
    auth,
    saveOrder,
    subscribeToOrders,
    updateOrderStatus,
    deleteOrder,
    saveSubscriber,
    saveReview,
    loginWithGoogle,
    logoutUser,
    trackEvent
  };
}
