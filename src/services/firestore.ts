import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase app if not already initialized
if (!process.env.FIREBASE_APP_INITIALIZED) {
  const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS ? undefined : undefined;
  initializeApp({
    credential: serviceAccount ? cert(serviceAccount as ServiceAccount) : undefined,
  });
  process.env.FIREBASE_APP_INITIALIZED = 'true';
}

export const db = getFirestore();
