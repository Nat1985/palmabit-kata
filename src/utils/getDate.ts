import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

export function getDate(isoDateString: string) {
    const date = parseISO(isoDateString);
    return format(date, 'dd MMMM yyyy, HH:mm', { locale: enUS });
}