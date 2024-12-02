import { 
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuthErrorMessage } from './errors';

export interface SecurityUpdateResponse {
  success: boolean;
  error: string | null;
}

export const updateUserPassword = async (
  user: User,
  currentPassword: string,
  newPassword: string
): Promise<SecurityUpdateResponse> => {
  try {
    const credential = EmailAuthProvider.credential(
      user.email!,
      currentPassword
    );
    
    // Re-authenticate user before password change
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
    
    // Update security audit log
    await updateDoc(doc(db, 'users', user.uid), {
      lastPasswordUpdate: new Date().toISOString(),
      securityUpdates: {
        type: 'PASSWORD_CHANGE',
        timestamp: new Date().toISOString()
      }
    });

    return { success: true, error: null };
  } catch (error: any) {
    return { 
      success: false, 
      error: getAuthErrorMessage(error.code)
    };
  }
};

export const updateSecurityPreferences = async (
  userId: string,
  preferences: {
    twoFactorEnabled?: boolean;
    loginNotifications?: boolean;
  }
): Promise<SecurityUpdateResponse> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      securityPreferences: preferences,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true, error: null };
  } catch (error: any) {
    return {
      success: false,
      error: getAuthErrorMessage(error.code)
    };
  }
};