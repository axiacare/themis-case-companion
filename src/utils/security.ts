/**
 * Security utilities for encrypted storage and session management
 */

// Simple encryption key derivation (in production, use proper key management)
const getEncryptionKey = (): string => {
  const userAgent = navigator.userAgent;
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 60)); // Changes every hour
  return btoa(userAgent + timestamp).slice(0, 32);
};

/**
 * Encrypt sensitive data before storing in sessionStorage
 */
export const encryptSessionData = (data: string): string => {
  try {
    const key = getEncryptionKey();
    // Simple XOR encryption (for production, use proper encryption library)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return data; // Fallback to unencrypted
  }
};

/**
 * Decrypt data from sessionStorage
 */
export const decryptSessionData = (encryptedData: string): string => {
  try {
    const key = getEncryptionKey();
    const encrypted = atob(encryptedData);
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
      decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData; // Fallback to original data
  }
};

/**
 * Securely store team data in session storage
 */
export const setSecureTeamData = (teamData: any): void => {
  const dataString = JSON.stringify(teamData);
  const encryptedData = encryptSessionData(dataString);
  sessionStorage.setItem('secure_team_data', encryptedData);
};

/**
 * Securely retrieve team data from session storage
 */
export const getSecureTeamData = (): any => {
  const encryptedData = sessionStorage.getItem('secure_team_data');
  if (!encryptedData) return null;
  
  try {
    const decryptedData = decryptSessionData(encryptedData);
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Failed to decrypt team data:', error);
    // Clear corrupted data
    sessionStorage.removeItem('secure_team_data');
    return null;
  }
};

/**
 * Clear secure team data
 */
export const clearSecureTeamData = (): void => {
  sessionStorage.removeItem('secure_team_data');
};

/**
 * Generate secure session token
 */
export const generateSecureToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate session token format
 */
export const isValidSessionToken = (token: string): boolean => {
  return /^[a-f0-9]{64}$/.test(token);
};