import { createUserSchema, updateUserSchema } from '../../user.schema';

describe('User Schemas', () => {
  describe('createUserSchema', () => {
    it('should validate valid matomo_id', () => {
      const validData = { matomo_id: '1234567890123456' };
      const result = createUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid matomo_id length', () => {
      const invalidData = { matomo_id: '123456789012345' }; // 15 chars
      const result = createUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('16 caractères');
      }
    });

    it('should reject additional fields', () => {
      const invalidData = { 
        matomo_id: '1234567890123456',
        extra_field: 'should be rejected'
      };
      const result = createUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('updateUserSchema', () => {
    it('should validate valid favorite_indicator (string)', () => {
      const validData = { favorite_indicator: 'pollen_allergy' };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate valid favorite_indicators (string)', () => {
      const validData = { favorite_indicators: 'weather_alert' };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate and normalize favorite_indicators (array)', () => {
      const validData = { favorite_indicators: ['pollen_allergy'] };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        // Le schéma devrait normaliser le tableau en prenant le premier élément
        expect(result.data.favorite_indicators).toBe('pollen_allergy');
      }
    });

    it('should validate and normalize favorite_indicators (array with multiple items)', () => {
      const validData = { favorite_indicators: ['pollen_allergy', 'weather_alert'] };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        // Le schéma devrait normaliser le tableau en prenant le premier élément
        expect(result.data.favorite_indicators).toBe('pollen_allergy');
      }
    });

    it('should handle empty array for favorite_indicators', () => {
      const validData = { favorite_indicators: [] };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        // Le schéma devrait normaliser le tableau vide en null
        expect(result.data.favorite_indicators).toBe(null);
      }
    });

    it('should validate null values', () => {
      const validData = { 
        favorite_indicator: null,
        favorite_indicators: null 
      };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate undefined values', () => {
      const validData = { 
        favorite_indicator: undefined,
        favorite_indicators: undefined 
      };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid favorite indicator values', () => {
      const invalidData = { favorite_indicator: 'invalid_indicator' };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid favorite indicators array values', () => {
      const invalidData = { favorite_indicators: ['invalid_indicator'] };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate valid coordinates', () => {
      const validData = {
        coordinates: {
          lat: 48.8566,
          lon: 2.3522
        }
      };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid latitude', () => {
      const invalidData = {
        coordinates: {
          lat: 91, // > 90
          lon: 2.3522
        }
      };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Latitude doit être entre -90 et 90');
      }
    });

    it('should reject invalid longitude', () => {
      const invalidData = {
        coordinates: {
          lat: 48.8566,
          lon: 181 // > 180
        }
      };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Longitude doit être entre -180 et 180');
      }
    });

    it('should validate valid notifications_preference', () => {
      const validData = {
        notifications_preference: ['morning', 'evening']
      };
      const result = updateUserSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid notifications_preference', () => {
      const invalidData = {
        notifications_preference: ['invalid_time']
      };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject additional fields', () => {
      const invalidData = {
        favorite_indicator: 'pollen_allergy',
        extra_field: 'should be rejected'
      };
      const result = updateUserSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
