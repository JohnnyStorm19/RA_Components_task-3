import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
dayjs.locale('ru')

import { capitalizeFirstLetter } from '../helpers/capitalizer';
import { replaceEndString } from '../helpers/replaceEndString';
import { generateCalendar } from '../helpers/generateCalendar';
import { getDatesFromArrOfArrs } from '../helpers/getDatesFromArrOfArrs';

interface IData {
    date: Date
}

export function Calendar({ date }: IData) {
    const currentDate = dayjs(date);
    const currentWeekDay = currentDate.format('dddd');
    const currentMonth = currentDate.format('MMMM');

    const calendar = generateCalendar();
    const datesGetter = getDatesFromArrOfArrs(currentMonth, calendar);
    const casedMonth = replaceEndString(capitalizeFirstLetter(currentMonth));

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{ capitalizeFirstLetter(currentWeekDay) }</div>
                <div className="ui-datepicker-material-date">
                <div className="ui-datepicker-material-day-num">{ dayjs().date() }</div>
                <div className="ui-datepicker-material-month">{ casedMonth }</div>
                <div className="ui-datepicker-material-year">{ dayjs().year() }</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{ capitalizeFirstLetter(currentMonth) }</span>&nbsp;<span className="ui-datepicker-year">{ dayjs().year() }</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col className="ui-datepicker-week-end"/>
                <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
                </thead>
                <tbody>
                    { datesGetter.map((week, id) => {
                        return (
                            <tr key={id}>
                                { week.map((date, id) => {
                                    if (date.isOtherMonth) {
                                        return (
                                            <td className="ui-datepicker-other-month" key={id}>{date.day}</td>
                                        )
                                    }
                                    if (date.isToday) {
                                        return (
                                            <td className="ui-datepicker-today" key={id}>{date.day}</td>
                                        )
                                    }
                                    return (
                                        <td key={id}>{date.day}</td>
                                    )
                                }) }
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
        </div>
    )
}