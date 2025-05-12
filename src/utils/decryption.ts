import crypto from 'crypto';

// Custom decryption algorithm using AES-256-CBC with a custom key derivation
export function decryptCredentials(encryptedData: string): string {
  try {
    const decryptionKey = process.env.DECRYPTION_KEY;
    if (!decryptionKey) {
      throw new Error('Decryption key not found in environment variables');
    }

    // Split IV and encrypted data
    const [ivHex, encryptedHex] = encryptedData.split(':');
    if (!ivHex || !encryptedHex) {
      throw new Error('Invalid encrypted data format');
    }

    // Convert hex IV back to Buffer
    const iv = Buffer.from(ivHex, 'hex');

    // Create custom key using SHA-256 (must match encryption key derivation)
    const key = crypto.createHash('sha256')
      .update(String(decryptionKey))
      .digest('base64')
      .slice(0, 32); // Use first 32 bytes for AES-256

    // Create decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    // Decrypt the data
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

// Verify if decryption key can decrypt data encrypted with encryption key
export function verifyKeys(testData: string = 'test'): boolean {
  try {
    const encrypted = require('./encryption').encryptCredentials(testData);
    const decrypted = decryptCredentials(encrypted);
    return decrypted === testData;
  } catch (error) {
    console.error('Key verification failed:', error);
    return false;
  }
}
