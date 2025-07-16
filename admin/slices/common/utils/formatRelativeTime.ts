import { useI18n } from 'vue-i18n';

export default function formatRelativeTime(value: Date, options?: Intl.RelativeTimeFormatOptions) {
  const { locale } = useI18n();

  if (!value) return undefined;
  if (!options) {
    options = {
      localeMatcher: 'best fit',
      numeric: 'auto',
      style: 'long',
    };
  }
  const relativeTime = new Intl.RelativeTimeFormat(locale.value, options);

  const currentTime = new Date().getTime();
  const createdTime = new Date(value).getTime();

  const TIME_MINUTE = 60;
  const TIME_HOUR = 60;
  const TIME_DAY = 24;
  const TIME_MONTH = 30;
  const TIME_YEAR = 12;

  const rest = currentTime - createdTime;

  const seconds = Math.floor(Math.abs(rest / 1000));
  const minutes = Math.floor(Math.abs(seconds / TIME_MINUTE));
  const hours = Math.floor(Math.abs(minutes / TIME_HOUR));
  const days = Math.floor(Math.abs(hours / TIME_DAY));
  const months = Math.floor(Math.abs(days / TIME_MONTH));
  const years = Math.floor(Math.abs(months / TIME_YEAR));

  if (seconds >= 0 && seconds <= TIME_MINUTE) {
    return relativeTime.format(-seconds, 'second');
  }

  if (minutes >= 1 && minutes <= TIME_HOUR) {
    return relativeTime.format(-minutes, 'minute');
  }

  if (hours >= 1 && hours < TIME_DAY) {
    return relativeTime.format(-hours, 'hour');
  }

  if (days >= 1 && days <= TIME_MONTH) {
    return relativeTime.format(-days, 'day');
  }

  if (months >= 1 && months <= TIME_YEAR) {
    return relativeTime.format(-months, 'month');
  }

  if (years >= 1) {
    return relativeTime.format(-years, 'year');
  }
}
