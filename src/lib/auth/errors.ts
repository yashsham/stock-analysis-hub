export const AUTH_ERROR_MESSAGES: { [key: string]: string } = {
  'auth/invalid-credential': 'Invalid email or password. Please check your credentials and try again.',
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/weak-password': 'Password should be at least 6 characters long.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/network-request-failed': 'Network error. Please check your internet connection.',
  'default': 'An error occurred. Please try again later.'
};

export const getAuthErrorMessage = (errorCode: string): string => {
  return AUTH_ERROR_MESSAGES[errorCode] || AUTH_ERROR_MESSAGES.default;
};