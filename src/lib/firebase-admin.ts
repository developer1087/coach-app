import { initializeApp, getApps, getApp, App, cert } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";

function initializeAdminApp(): App {
  if (getApps().length === 0) {
    const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS
      ? cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
      : undefined;

    return initializeApp({
      credential: credentials,
      projectId: process.env.FIREBASE_PROJECT_ID || "nextcoach87",
    });
  } else {
    return getApp();
  }
}

// Initialize the Firebase Admin app
const app: App = initializeAdminApp();

// Get the Auth service from the initialized app
const adminAuth: Auth = getAuth(app);

// Export the auth service and the app instance for use in other parts of your application
export { adminAuth };
export const adminApp = app;

/**
 * Verifies a Firebase ID token.
 * @param {string} token The ID token to verify.
 * @returns {Promise<DecodedIdToken>} A promise that resolves with the decoded token.
 * @throws {Error} If the token verification fails.
 */
export const verifyFirebaseToken = async (token: string) => {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error: any) { // Use 'any' or a more specific type if you know it for error
    console.error("Token verification failed:", error);
    // You might want to throw a specific type of error here for better error handling upstream
    throw new Error(`Invalid token: ${error.message || 'unknown error'}`);
  }
};
