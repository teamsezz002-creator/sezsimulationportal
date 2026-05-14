import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Use the default Firestore database if firestoreDatabaseId is not provided
const databaseId = (firebaseConfig as any).firestoreDatabaseId || undefined;

export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
