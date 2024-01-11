import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
dayjs.extend(relativeTime);
dayjs.locale('fr');

export namespace DateService {
  export function getTimeFromNow(date: Date | string | undefined): string {
    if (!date) {
      return '';
    }
    return dayjs(date).fromNow();
  }
}
