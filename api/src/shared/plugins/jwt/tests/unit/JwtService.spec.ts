/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import authConfig from '@config/auth';
import jwt from 'jsonwebtoken';

import { JwtService, IJwtPayload, ITokenPayload } from '../../JwtService';

jest.mock('jsonwebtoken');

describe('JwtService', () => {
  const jwtService = new JwtService();
  const payload: IJwtPayload = { id: 'user-id' };
  const token = 'generated-token';
  const decodedToken: ITokenPayload = {
    iat: 123456,
    exp: 12345678,
    id: 'user-id',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a token with the correct payload and config', async () => {
    const signSpy = jest
      .spyOn(jwt, 'sign')
      .mockImplementation((payload, secret, options, callback) => {
        return token;
      });

    const result = await jwtService.generateToken(payload);

    expect(signSpy).toHaveBeenCalledWith(payload, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });
    expect(result).toBe(token);
  });

  it('should verify a token and return the decoded payload', async () => {
    const verifySpy = jest
      .spyOn(jwt, 'verify')
      .mockImplementation((token, secret, callback) => {
        return decodedToken;
      });

    const result = await jwtService.verifyToken(token);

    expect(verifySpy).toHaveBeenCalledWith(token, authConfig.jwt.secret);
    expect(result).toEqual(decodedToken);
  });

  it('should throw an error if token generation fails', async () => {
    const signSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => {
      throw new Error('Token generation failed');
    });

    await expect(jwtService.generateToken(payload)).rejects.toThrow(
      'Token generation failed',
    );
  });

  it('should throw an error if token verification fails', async () => {
    const verifySpy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await expect(jwtService.verifyToken(token)).rejects.toThrow(
      'Invalid token',
    );
  });
});
