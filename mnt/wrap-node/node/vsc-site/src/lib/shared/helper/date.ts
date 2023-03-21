import { format as _format } from 'date-fns';

export function format(date: Date, formatter: string = 'yyyy-MM-dd HH:mm:SS') {
	return _format(date, formatter);
}
