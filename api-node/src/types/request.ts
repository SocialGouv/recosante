import type express from 'express';
import type { User } from '@prisma/client';
import type { MatomoEvent } from './matomo-event';

export interface RequestWithUser extends express.Request {
  user: User;
}

export interface RequestWithMatomoEvent extends express.Request {
  body: {
    event: MatomoEvent;
    userId: User['matomo_id'];
    dimensions?: string;
  };
}
