import 'intl';
import 'intl/locale-data/jsonp/mn-MN';

import {DateTime} from 'luxon';
import {constantValues} from '../constants';

export function CurrencyFormatter(
  currencyCode: string = 'MNT',
  locales: string = 'mn-MN',
) {
  const options = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    maximumFractionDigits: 0,
  };

  return new Intl.NumberFormat(locales, options);
}

export function DateTimeFormatter(
  text: string = '',
  format: string = constantValues?.dateTimeFormat,
) {
  if (text) {
    return DateTime?.fromISO(text)?.toFormat(format);
  } else {
    return null;
  }
}

export function DurationFormatter(dateISOString: string = '') {
  if (!dateISOString) {
    return null;
  }

  const now = DateTime?.now();
  const createdDate = DateTime.fromISO(dateISOString);

  const {hours = -1, minutes = -1} = now
    .diff(createdDate, ['hours', 'minutes'])
    .toObject();

  if (hours === -1 && minutes === -1) {
    return null;
  }

  if (hours > 1 && hours < 24) {
    return `${Math.floor(hours)} цагийн өмнө`;
  } else if (hours < 1 && minutes > 0) {
    return `${Math.floor(minutes)} минутын өмнө`;
  }

  return DateTimeFormatter(dateISOString);
}

export function DateFormatter(timeISOString: string = '') {
  if (!timeISOString) {
    return null;
  }

  const time = DateTime.fromISO(timeISOString);

  // Formatea la hora en formato HH:mm
  return time.toFormat('dd/MM/yyyy');
}

export function TimeFormatter(timeISOString: string = '') {
  if (!timeISOString) {
    return null;
  }

  const time = DateTime.fromISO(timeISOString);

  // Formatea la hora en formato HH:mm
  return time.toFormat('HH:mm');
}
