import { format, parseISO } from 'date-fns';
import { it, enUS } from 'date-fns/locale';

export function getDate(isoDateString: string) {
    const date = parseISO(isoDateString);
    return format(date, 'dd MMMM yyyy', { locale: enUS });
}