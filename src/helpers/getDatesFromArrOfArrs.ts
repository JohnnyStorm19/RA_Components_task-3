import dayjs from "dayjs";
import 'dayjs/locale/ru';

interface IDatesFromArrOfArrs {
    day: number,
    month: string,
    isOtherMonth: boolean,
    isToday?: boolean
}

export function getDatesFromArrOfArrs(currentMonth: string, arr: dayjs.Dayjs[][]): IDatesFromArrOfArrs[][] {
    const newArr = arr.map(week => {
        return week.map(day => {
            const dayMonth = day.format('MMMM');
            if (dayMonth != currentMonth) {
                return { day: day.get('date'), month: dayMonth, isOtherMonth: true}
            }
            if ( (dayMonth === currentMonth) && (dayjs().date() === day.get('date')) ) {
                return { day: day.get('date'), month: dayMonth, isOtherMonth: false, isToday: true}
            }
            return { day: day.get('date'), month: dayMonth, isOtherMonth: false}
        })
    })
    return newArr;
}