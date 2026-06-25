import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "lexical-outcome-6dzcr",
  appId: "1:273741762495:web:8722ede947cade785fdb0a",
  apiKey: "AIzaSyAV7AMKo6C_uBfaPu9zjucrBkOkXlT4ZXE",
  authDomain: "lexical-outcome-6dzcr.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-1971ebb9-c5cb-41c1-a544-0ce5b60b20ab",
  storageBucket: "lexical-outcome-6dzcr.firebasestorage.app",
  messagingSenderId: "273741762495"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {}, // No auth implemented or active
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

