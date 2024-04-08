import dayjs from 'dayjs';
import type { User } from '@prisma/client';
import prisma from '~/prisma';

export async function canAskReviewForUser(user: User | null) {
  if (!user) return false; // no user
  if (Number(user.appbuild) < 24) {
    console.log('store review unavailable before');
    return false;
  }
  if (user?.asked_for_review) {
    console.log('already done manually');
    return false;
  }
  const notificationsSent = await prisma.notification.count({
    where: {
      user_id: user.id,
    },
  });
  if (!notificationsSent) {
    console.log('not enough experience with the app');
    return false;
  }
  if (!user?.asked_for_review_latest_at) {
    console.log('no date, meaning never asked before so we can ask');
    return true;
  }
  if (dayjs().diff(dayjs(user?.asked_for_review_latest_at), 'months') < 3) {
    console.log('too recent');
    return false; // too recent
  }
  return true;
}
