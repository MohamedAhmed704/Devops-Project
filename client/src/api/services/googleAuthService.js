import apiClient from '../apiClient';

export const googleAuthService = {

  getAuthUrl: () => apiClient.get('/api/auth/google/url'),


  signInWithGoogle: (idToken) => apiClient.post('/api/auth/google/signin', { idToken }),


  linkGoogleAccount: (idToken) => apiClient.post('/api/auth/google/link', { idToken }),


  unlinkGoogleAccount: () => apiClient.post('/api/auth/google/unlink'),


  getGoogleStatus: () => apiClient.get('/api/auth/google/status')
  
};
