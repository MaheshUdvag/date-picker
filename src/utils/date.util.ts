import { IDate } from "../Interface/IDate";
import { DAY_MAPPING } from "../constants/DateConstants";

export const compareDates = (date1: IDate, date2: IDate) => {

    const dateObj1 = new Date(date1.year,date1.month,date1.date);
    const dateObj2 = new Date(date2.year,date2.month,date2.date);
    const date1Timestamp = dateObj1.getTime();
    const date2Timestamp = dateObj2.getTime();

    if(date1Timestamp > date2Timestamp) {
        return 1;
    } else if(date1Timestamp < date2Timestamp) {
        return -1;
    } else {
        return 0;
    }
}

export const sortDates = (date1: IDate,date2: IDate) => {
    const dateFlag = compareDates(date1,date2);
    if(dateFlag !== 1) {
        return [date1,date2];
    } 
    return [date2,date1];
}

export const isDateBetweenDates = (date: IDate,startDate: IDate,endDate: IDate) => {
    const isGreaterThanStart = compareDates(date,startDate);
    let isBetweenDateRange = false;
    if(isGreaterThanStart >= 0) {
        const isLesserThanEnd = compareDates(date,endDate);
        if(isLesserThanEnd <= 0) {
            isBetweenDateRange =  true;
        }
    }

    return isBetweenDateRange;
}

export const isDateWeekDay = (date: IDate) => {
   
    const dateObject = new Date(date.year,date.month,date.date);
    const day: number = dateObject.getDay();

    return day !== DAY_MAPPING.Saturday && day !== DAY_MAPPING.Sunday;
}

export const getWeekendsBetweenDates = (startDate: IDate, endDate: IDate): string[] => {

    const weekEnds: string[] = [];

    const start = new Date(startDate.year,startDate.month,startDate.date);
    const end = new Date(endDate.year,endDate.month,endDate.date);

    while(start.getTime() !== end.getTime()) {
        if(start.getDay() === DAY_MAPPING.Saturday || start.getDay() === DAY_MAPPING.Sunday) {
            weekEnds.push(formatDate(start));
        }
        start.setDate(start.getDate()+1);
    }

    return weekEnds;

}

export const formatDate = (day: Date) => {
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    return formatIDate({ year, month, date});
}

export const formatIDate = (iDate: IDate) => {
    const year = iDate.year;
    const month = iDate.month + 1;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const date = iDate.date < 10 ? `0${iDate.date}` : iDate.date;
    return `${year}-${formattedMonth}-${date}`;
}