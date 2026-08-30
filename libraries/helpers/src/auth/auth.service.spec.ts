import { decode } from 'jsonwebtoken';
import { AuthService } from './auth.service';

describe('AuthService JWT', () => {
  const previousSecret = process.env.JWT_SECRET;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-with-at-least-thirty-two-chars';
  });

  afterAll(() => {
    process.env.JWT_SECRET = previousSecret;
  });

  it('assina HS256 com expiracao de 30 dias', () => {
    const token = AuthService.signJWT({ sub: 'user-1' });
    const payload = decode(token, { complete: true });

    expect(payload?.header.alg).toBe('HS256');
    const body = payload?.payload as { iat: number; exp: number };
    expect(body.exp - body.iat).toBe(30 * 24 * 60 * 60);
    expect(AuthService.verifyJWT(token)).toMatchObject({ sub: 'user-1' });
  });
});
