import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  User
} from 'firebase/auth';
import { auth } from '../firebase';
import { getAuthErrorMessage } from './errors';
import { createUserProfile } from '../db';

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { 
      user: null, 
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const signUp = async (
  email: string, 
  password: string, 
  userData: any
): Promise<AuthResponse> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(result.user.uid, userData);
    await sendEmailVerification(result.user);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { 
      user: null, 
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const resendVerificationEmail = async (user: User): Promise<{ error: string | null }> => {
  try {
    await sendEmailVerification(user);
    return { error: null };
  } catch (error: any) {
    return { error: getAuthErrorMessage(error.code) };
  }
};

export const updateUserPassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
): Promise<{ error: string | null }> => {
  try {
    const credential = EmailAuthProvider.credential(user.email!, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { error: null };
  } catch (error: any) {
    return { error: getAuthErrorMessage(error.code) };
  }
};

export const resetPassword = async (email: string): Promise<{ error: string | null }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    return { error: getAuthErrorMessage(error.code) };
  }
};

export const logout = async (): Promise<{ error: string | null }> => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: getAuthErrorMessage(error.code) };
  }
};