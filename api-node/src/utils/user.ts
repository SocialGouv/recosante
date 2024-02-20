import dayjs from 'dayjs';
import type { User } from '@prisma/client';

export function canAskReviewForUser(user: User | null) {
  if (!user) return false; // no user
  if (Number(user.appbuild) < 24) {
    console.log('store review unavailable before');
    return false; // store review unavailable before
  }
  if (!user?.notifications_sent) {
    console.log('not enough experience with the app');
    return false; // not enough experience with the app
  }
  if (user?.asked_for_review) {
    console.log('already done');
    return false; // already done
  }
  if (!user?.asked_for_review_latest_at) return true; // no date
  if (dayjs().diff(dayjs(user?.asked_for_review_latest_at), 'months') < 3) {
    console.log('too recent');
    return false; // too recent
  }
  return true;
}
