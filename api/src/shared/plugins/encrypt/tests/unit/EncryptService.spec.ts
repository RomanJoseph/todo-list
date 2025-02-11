import bcrypt from 'bcrypt';

import { EncryptService } from '../../EncryptService';

jest.mock('bcrypt');

describe('EncryptService', () => {
  const password = 'plainPassword';
  const hashedPassword = 'hashedPassword';
  let encryptService: EncryptService;

  beforeEach(() => {
    encryptService = new EncryptService();
    jest.clearAllMocks();
  });

  it('should encrypt the password using bcrypt', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    const result = await encryptService.encryptPassword(password);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
    expect(result).toBe(hashedPassword);
  });

  it('should return true when passwords match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await encryptService.comparePassword(
      password,
      hashedPassword,
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toBe(true);
  });

  it('should return false when passwords do not match', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await encryptService.comparePassword(
      password,
      hashedPassword,
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toBe(false);
  });

  it('should handle errors thrown by bcrypt.hash', async () => {
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hash error'));

    await expect(encryptService.encryptPassword(password)).rejects.toThrow(
      'Hash error',
    );
  });

  it('should handle errors thrown by bcrypt.compare', async () => {
    (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('Compare error'));

    await expect(
      encryptService.comparePassword(password, hashedPassword),
    ).rejects.toThrow('Compare error');
  });
});
