export function replaceEndString(str: string): string {
    const monthsWithReplacements: Record<string, string> = {
        Январь: 'Января',
        Февраль: 'Февраля',
        Март: 'Марта',
        Апрель: 'Апреля',
        Май: 'Мая',
        Июнь: 'Июня',
        Июль: 'Июля',
        Август: 'Августа',
        Сентябрь: 'Сентября',
        Октябрь: 'Октября',
        Ноябрь: 'Ноября',
        Декабрь: 'Декабря'
    };

    return monthsWithReplacements[str];
}