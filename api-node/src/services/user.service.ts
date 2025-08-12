import prisma from '../prisma';

export interface UserUpdateData {
  municipality_insee_code?: string;
  municipality_name?: string;
  municipality_zip_code?: string;
  udi?: string;
  granularity?: string;
  push_notif_token?: string;
  favorite_indicator?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  notifications_preference?: string[];
}

export interface UserCreateData {
  matomo_id: string;
}

/**
 * Create or update a user with matomo_id
 */
export async function upsertByMatomoId(matomoId: string): Promise<any> {
  return await prisma.user.upsert({
    where: { matomo_id: matomoId },
    update: { matomo_id: matomoId },
    create: { matomo_id: matomoId },
  });
}

/**
 * Clean up old push tokens to prevent conflicts
 */
async function cleanupOldPushTokens(
  currentUserId: string,
  pushToken: string
): Promise<void> {
  if (!pushToken || pushToken.length === 0) return;

  const usersWithSamePushToken = await prisma.user.findMany({
    where: {
      id: { not: currentUserId },
      push_notif_token: pushToken,
    },
  });

  if (usersWithSamePushToken.length > 0) {
    await prisma.user.updateMany({
      where: {
        id: { in: usersWithSamePushToken.map((user: any) => user.id) },
      },
      data: {
        push_notif_token: `DELETED_${pushToken}`,
        deleted_at: new Date(),
        deleted_because: `push_notif_token taken by a more recent user (id: ${currentUserId})`,
      },
    });
  }
}

/**
 * Update user with provided data and handle push token cleanup
 */
export async function updateUser(
  matomoId: string,
  updateData: UserUpdateData,
  headers: Record<string, string | undefined>
): Promise<any> {
  const userUpdate: any = {
    appversion: headers.appversion,
    appbuild: headers.appbuild,
    appdevice: headers.appdevice,
  };

  Object.entries(updateData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      userUpdate[key] = value;
    }
  });

  const updatedUser = await prisma.user.upsert({
    where: { matomo_id: matomoId },
    update: userUpdate,
    create: {
      matomo_id: matomoId,
      ...userUpdate,
    },
  });

  if (updatedUser.push_notif_token) {
    await cleanupOldPushTokens(updatedUser.id, updatedUser.push_notif_token);
  }

  return updatedUser;
}

/**
 * Check if a property exists in the request body
 */
export function bodyHasProperty(body: any, property: string): boolean {
  if (!body || typeof body !== 'object') return false;
  return Object.prototype.hasOwnProperty.call(body, property);
}

/**
 * Extract user update data from request body
 */
export function extractUpdateData(body: any): UserUpdateData {
  const updateData: UserUpdateData = {};

  const fields = [
    'municipality_insee_code',
    'municipality_name',
    'municipality_zip_code',
    'udi',
    'granularity',
    'push_notif_token',
    'favorite_indicator',
    'notifications_preference',
  ];

      fields.forEach((field) => {
      if (bodyHasProperty(body, field) && body[field] !== undefined && body[field] !== null) {
        (updateData as any)[field] = body[field];
      }
    });

  if (bodyHasProperty(body, 'coordinates')) {
    updateData.coordinates = body.coordinates;
  }

  return updateData;
}
