import crypto from 'crypto';

// Custom encryption algorithm using AES-256-CBC with a custom key derivation
export function encryptCredentials(data: string): string {
  try {
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      throw new Error('Encryption key not found in environment variables');
    }

    // Generate a random IV
    const iv = crypto.randomBytes(16);
    
    // Create custom key using SHA-256
    const key = crypto.createHash('sha256')
      .update(String(encryptionKey))
      .digest('base64')
      .slice(0, 32); // Use first 32 bytes for AES-256
    
    // Create cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Combine IV and encrypted data
    // Format: iv:encrypted
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}
