import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localeData from 'dayjs/plugin/localeData'
import weekdayPlugin from "dayjs/plugin/weekday";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(isSameOrBefore)
dayjs.extend(weekdayPlugin)
dayjs.locale('ru')

dayjs.extend(updateLocale)

// начинаем неделю с понедельника
dayjs.updateLocale('ru', {
    weekStart : 1
})

export function generateCalendar(): dayjs.Dayjs[][] {
    // dayjs.extend(localeData)
    // dayjs().localeData()

  const currentDate = dayjs();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  // получаем первый день месяца
  const firstDay = dayjs().year(currentYear).month(currentMonth).startOf('month');

  // Количество дней, которые нужно добавить ДО первого дня календаря
  const daysToPrepend = firstDay.weekday();

  // Получаем самый первый день для отображения (из firstDay вычитыаем daysToPrepend)
  const firstDisplayDay = firstDay.subtract(daysToPrepend, 'day');

  // Получаем последний день месяца
  const lastDay = dayjs().year(currentYear).month(currentMonth).endOf('month');

  // Количество дней, которые нужно добавить ПОСЛЕ последнего дня календаря
  const daysToAppend = 6 - lastDay.weekday();

  // Получаем самый последний день для отображения (к lastDay добавляем daysToAppend)
  const lastDisplayDay = lastDay.add(daysToAppend, 'day');

  const calendar: dayjs.Dayjs[] = [];

  // Пушим в календарь все дни для отображения (включая прошлый и последующий месяц, если таковые имеются)
  let day = firstDisplayDay;
  while (day.isBefore(lastDisplayDay)) {
    calendar.push(day);
    day = day.add(1, 'day');
  }

  // Группируем календарь по неделям
  const weeks: dayjs.Dayjs[][] = [];
  for (let i = 0; i < calendar.length; i += 7) {
    weeks.push(calendar.slice(i, i + 7));
  }

  // возвращаем тот же календарь, но с разбивкой на недели
  return weeks;
}