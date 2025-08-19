import { createUserSchema, updateUserSchema } from '../../user.schema';

describe('User Schemas', () => {
  describe('createUserSchema', () => {
    it('should validate valid matomo_id', () => {
      const validData = { matomo_id: '1234567890123456' };
      const result = createUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject matomo_id that is too short', () => {
      const invalidData = { matomo_id: '123' };
      const result = createUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('16 caractères');
      }
    });

    it('should reject matomo_id that is too long', () => {
      const invalidData = { matomo_id: '12345678901234567' };
      const result = createUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('16 caractères');
      }
    });

    it('should reject missing matomo_id', () => {
      const invalidData = {};
      const result = createUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
    });

    it('should reject additional fields', () => {
      const invalidData = { 
        matomo_id: '1234567890123456',
        extra_field: 'should_be_rejected'
      };
      const result = createUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
    });
  });

  describe('updateUserSchema', () => {
    it('should validate empty object (all fields optional)', () => {
      const validData = {};
      const result = updateUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({});
      }
    });

    it('should validate all optional fields', () => {
      const validData = {
        granularity: 'city',
        municipality_insee_code: '75056',
        municipality_name: 'Paris',
        municipality_zip_code: '75001',
        udi: 'udi_code',
        push_notif_token: 'token123',
        favorite_indicator: 'indice_atmospheric',
        notifications_preference: ['morning', 'evening'],
      };
      
      const result = updateUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should validate coordinates with valid lat/lon', () => {
      const validData = {
        coordinates: {
          lat: 48.8566,
          lon: 2.3522,
        },
      };
      
      const result = updateUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.coordinates).toEqual(validData.coordinates);
      }
    });

    it('should reject coordinates with invalid latitude', () => {
      const invalidData = {
        coordinates: {
          lat: 91, // Invalid: > 90
          lon: 2.3522,
        },
      };
      
      const result = updateUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Latitude doit être entre -90 et 90');
      }
    });

    it('should reject coordinates with invalid longitude', () => {
      const invalidData = {
        coordinates: {
          lat: 48.8566,
          lon: 181, // Invalid: > 180
        },
      };
      
      const result = updateUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Longitude doit être entre -180 et 180');
      }
    });

    it('should validate notifications_preference as array of strings', () => {
      const validData = {
        notifications_preference: ['morning', 'evening', 'alert'],
      };
      
      const result = updateUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.notifications_preference).toEqual(['morning', 'evening', 'alert']);
      }
    });

    it('should reject notifications_preference with non-string elements', () => {
      const invalidData = {
        notifications_preference: ['morning', 123, 'alert'], // 123 is not a string
      };
      
      const result = updateUserSchema.safeParse(invalidData);
      
      expect(result.success).toBe(false);
    });

    it('should allow partial updates', () => {
      const validData = {
        municipality_name: 'Paris',
        // Only one field provided
      };
      
      const result = updateUserSchema.safeParse(validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });
  });
});
