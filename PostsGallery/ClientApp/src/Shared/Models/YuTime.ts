export class YuTime {

    year: number;
    month: number;
    date: number;
    hours = 0;
    minutes = 0;
    seconds = 0;
    ms = 0;

    constructor(year: number | Date, month?: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number) {
        if (typeof year === 'number') {
            this.year = year ? year : 0;
            this.month = month ? month : 0;
            this.date = date ? date : 0;
            if (hours) this.hours = hours ? hours : 0;
            if (minutes) this.minutes = minutes ? minutes : 0;
            if (seconds) this.seconds = seconds ? seconds : 0;
            if (ms) this.ms = ms ? ms : 0;
        } else {
            if (typeof year.getFullYear !== 'function')
                year = new Date(year);
            this.year = year.getFullYear();
            this.month = year.getMonth() + 1;
            this.date = year.getDate();
            this.hours = year.getHours();
            this.minutes = year.getMinutes();
            this.seconds = year.getSeconds();
            this.ms = year.getMilliseconds();
        }
    }

    static FromDate(date: Date) {
        return new YuTime(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );
    }

    static getMilliseconds() {
        return new Date().getTime();
    }

    static Bind(date: YuTime): YuTime {
        return new YuTime(date.year, date.month, date.date, date.hours, date.minutes, date.seconds, date.ms);
    }

    toDate() {
        return YuTime.ToDate(this);
    }

    static ToDate(date: YuTime) {
        return new Date(date.year, date.month - 1, date.date, date.hours, date.minutes, date.seconds, date.ms);
    }

    getShortStr(withSeconds?: boolean) {
        return YuTime.ShortStr(this, withSeconds);
    }
    getTimeStr() {
        return YuTime.TimeStr(this);
    }
    public static TimeStr(date: YuTime): string {
        let result = '';
        if (date.hours < 10)
            result += '0' + date.hours.toString() + ':';
        else
            result += date.hours.toString() + ':';
        if (date.minutes < 10)
            result += '0' + date.minutes.toString() + ':';
        else
            result += date.minutes.toString() + ':';
        if (date.seconds < 10)
            result += '0' + date.seconds.toString();
        else
            result += date.seconds.toString();
        return result;
    }
    public static ShortStr(date: YuTime, withSeconds?: boolean) {
        let result: string;

        if (date.date < 10)
            result = '0' + date.date.toString() + '.';
        else
            result = date.date.toString() + '.';

        if (date.month < 10)
            result += '0' + date.month.toString() + '.';
        else
            result += date.month.toString() + '.';

        if (date.year < 10)
            result += '000' + date.year.toString();
        else if (date.year < 100)
            result += '00' + date.year.toString();
        else if (date.year < 1000)
            result += '0' + date.year.toString();
        else
            result += date.year.toString();
        if (withSeconds) {
            result += ' ' + YuTime.TimeStr(date);
        }

        return result;
    }
}