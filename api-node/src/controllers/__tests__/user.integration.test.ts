import request from 'supertest';
import express from 'express';
import userRouter from '../user';
import * as userService from '~/services/user.service';

// Mock du middleware d'authentification
jest.mock('~/middlewares/auth', () => ({
  withUser: jest.fn((req: any, res: any, next: any) => {
    req.user = { matomo_id: '1234567890123456' };
    next();
  }),
}));

// Mock du service utilisateur
jest.mock('~/services/user.service', () => ({
  upsertByMatomoId: jest
    .fn()
    .mockResolvedValue({ id: '1', matomo_id: '1234567890123456' }),
  updateUser: jest.fn().mockResolvedValue({
    id: '1',
    matomo_id: '1234567890123456',
    favorite_indicator: 'pollen_allergy',
  }),
  extractUpdateData: jest.fn().mockImplementation((body) => {
    // Simuler la logique d'extraction
    const updateData: any = {};
    if (body.favorite_indicator)
      updateData.favorite_indicator = body.favorite_indicator;
    if (body.favorite_indicators)
      updateData.favorite_indicators = body.favorite_indicators;
    return updateData;
  }),
}));

// Mock du middleware de validation
jest.mock('~/middlewares/validation', () => ({
  validateBody: jest.fn((schema) => (req: any, res: any, next: any) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Validation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),
}));

// Mock du middleware d'erreur
jest.mock('~/middlewares/errors', () => ({
  catchErrors: jest.fn((fn) => fn),
}));

const app = express();
app.use(express.json());
app.use('/user', userRouter);

describe('User Controller Integration Tests', () => {
  describe('POST /user', () => {
    it('should create user with valid matomo_id', async () => {
      const response = await request(app)
        .post('/user')
        .send({ matomo_id: '1234567890123456' })
        .expect(200);

      expect(response.body).toEqual({ ok: true });
    });

    it('should reject invalid matomo_id length', async () => {
      const response = await request(app)
        .post('/user')
        .send({ matomo_id: '123456789012345' }) // 15 chars
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('PUT /user', () => {
    it('should update user with favorite_indicator (string)', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicator: 'pollen_allergy' })
        .expect(200);

      expect(response.body).toEqual({
        ok: true,
        data: {
          id: '1',
          matomo_id: '1234567890123456',
          favorite_indicator: 'pollen_allergy',
        },
      });
    });

    it('should update user with favorite_indicators (string)', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicators: 'weather_alert' })
        .expect(200);

      expect(response.body).toEqual({
        ok: true,
        data: {
          id: '1',
          matomo_id: '1234567890123456',
          favorite_indicator: 'pollen_allergy',
        },
      });
    });

    it('should update user with favorite_indicators (array)', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicators: ['pollen_allergy'] })
        .expect(200);

      expect(response.body).toEqual({
        ok: true,
        data: {
          id: '1',
          matomo_id: '1234567890123456',
          favorite_indicator: 'pollen_allergy',
        },
      });
    });

    it('should update user with favorite_indicators (array with multiple items)', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicators: ['pollen_allergy', 'weather_alert'] })
        .expect(200);

      expect(response.body).toEqual({
        ok: true,
        data: {
          id: '1',
          matomo_id: '1234567890123456',
          favorite_indicator: 'pollen_allergy',
        },
      });
    });

    it('should handle empty array for favorite_indicators', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicators: [] })
        .expect(200);

      expect(response.body).toEqual({
        ok: true,
        data: {
          id: '1',
          matomo_id: '1234567890123456',
          favorite_indicator: 'pollen_allergy',
        },
      });
    });

    it('should reject invalid favorite indicator value', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicator: 'invalid_indicator' })
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should reject invalid favorite indicators array value', async () => {
      const response = await request(app)
        .put('/user')
        .set('appversion', '1.0.0')
        .set('appbuild', '123')
        .set('appdevice', 'ios')
        .send({ favorite_indicators: ['invalid_indicator'] })
        .expect(400);

      expect(response.body.error).toBe('Validation failed');
    });

    it('should include app headers in update data', async () => {
      await request(app)
        .put('/user')
        .set('appversion', '2.0.0')
        .set('appbuild', '456')
        .set('appdevice', 'android')
        .send({ favorite_indicator: 'pollen_allergy' })
        .expect(200);

      expect(userService.updateUser).toHaveBeenCalledWith(
        '1234567890123456',
        expect.objectContaining({
          favorite_indicator: 'pollen_allergy',
        }),
        {
          appversion: '2.0.0',
          appbuild: '456',
          appdevice: 'android',
        },
      );
    });
  });
});
