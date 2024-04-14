import { DATE_RANGE, DAY_MAPPING } from "../constants/DateConstants";

type START_END_DATE = { startDate: Date | null, endDate: Date | null };

const calculateStartDate = (days: number,endDate: Date) => {

    const startDate = new Date(endDate);
    let daysCount = 1;

    while (daysCount < days) {
        startDate.setDate(startDate.getDate() - 1);
        if (startDate.getDay() === DAY_MAPPING.Sunday) {
            startDate.setDate(startDate.getDate() - 2);
        }
        daysCount++;
    }

    return startDate;
}

const getRecentWeekday = (date: Date): Date => {

    const weekday = new Date(date);

    if (weekday.getDay() === DAY_MAPPING.Sunday) {
        weekday.setDate(weekday.getDate() - 2);
    }

    if (weekday.getDay() === DAY_MAPPING.Saturday) {
        weekday.setDate(weekday.getDate() - 1);
    }

    return weekday;
}

const getUpcommingWeekday = (date: Date): Date => {

    const weekday = new Date(date);

    if (weekday.getDay() === DAY_MAPPING.Sunday) {
        weekday.setDate(weekday.getDate() + 1);
    }

    if (weekday.getDay() === DAY_MAPPING.Saturday) {
        weekday.setDate(weekday.getDate() + 2);
    }

    return weekday;
}

export const isDateWeekend = (date: Date): boolean => date.getDay() === DAY_MAPPING.Saturday || date.getDay() === DAY_MAPPING.Sunday

const returnCurrentDate = (date: Date): START_END_DATE => {
    let today = new Date(date);

    /**
     * If the current date is a 
     * weekend return null as the
     * current date is not a 
     * valid selection
     */
    if(isDateWeekend(today)) {
        return {
            startDate: null,
            endDate: null
        }
    }

    return {
        startDate: today,
        endDate: new Date(today)
    }
}

const returnPreviousDate = (date: Date): START_END_DATE => {
    let yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);

    /**
     * If the previous day is a weekend
     * then return null as the previous 
     * day is not a valid selection.
     */
    if(isDateWeekend(yesterday)) {
        return {
            startDate: null,
            endDate: null
        }
    }
    return {
        startDate: yesterday,
        endDate: new Date(yesterday)
    };
}

const getThisWeekDays = (date: Date): START_END_DATE => {

    const startDate = new Date(date.getFullYear(),date.getMonth(),date.getDate() - date.getDay() + 1);
    const endDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+4);
    return {startDate, endDate};
}

const getLastSevenWeekDays = (date: Date): START_END_DATE => {

    const endDate = getRecentWeekday(date);
    const startDate = calculateStartDate(7,endDate);

    return { startDate, endDate };

} 

const getLastThirtyWeekDays = (date: Date): START_END_DATE => {

    const endDate = getRecentWeekday(date);
    const startDate = calculateStartDate(30,endDate);

    return { startDate, endDate };

} 

const getCurrentMonthWeekDays = (date: Date): START_END_DATE => {

    const endDate = getRecentWeekday(date);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(),1);
    const startDate = getUpcommingWeekday(firstDayOfMonth);

    /**
     * If the provided date is a weekend
     * and the recent weekday is of the previous
     * month then return the startDate and endDate
     * as null as there are no valid dates for the 
     * given month.
     */
    if(endDate.getMonth() !== date.getMonth()) {
        return {
            startDate: null,
            endDate: null
        }
    }


    return { startDate, endDate };
}

const getLastMonthDays = (date: Date): START_END_DATE => {
    const lastDayOfMonth = new Date(date.getFullYear(),date.getMonth(),0);
    const endDate = getRecentWeekday(lastDayOfMonth);

    const firstDayOfMonth = new Date(endDate.getFullYear(),endDate.getMonth(),1);
    const startDate = getUpcommingWeekday(firstDayOfMonth);

    return {
        startDate,
        endDate
    }
} 

const getThisYearWeekDays = (date: Date): START_END_DATE => {

    const endDate = getRecentWeekday(date);
    let startDate = new Date(endDate.getFullYear(), 0, 1);
    startDate = getUpcommingWeekday(startDate);

    /**
     * If the provided date is a weekend
     * and the recent weekday is of the previous
     * year then return the startDate and endDate
     * as null as there are no valid dates for the 
     * given year.
     */
    if(endDate.getFullYear() !== date.getFullYear()) {
        return {
            startDate: null,
            endDate: null
        }
    }


    return { startDate, endDate }
}

const getLastYearWeekDays = (date: Date): START_END_DATE => {

    const lastDateOfYear = new Date(date.getFullYear() - 1, 11, 31);
    const endDate = getRecentWeekday(lastDateOfYear);
    const firstDayOfTheYear = new Date(date.getFullYear() - 1, 0, 1);
    const startDate = getUpcommingWeekday(firstDayOfTheYear);

    return { startDate, endDate }
}

const getAllTimeWeekDays = (date: Date): START_END_DATE => {
    const endDate = getRecentWeekday(date);
    const allTimeDateStart = new Date(endDate.getFullYear()-1,0,1);
    const startDate = getUpcommingWeekday(allTimeDateStart);
    return {
        startDate,
        endDate
    }
}

const dateRangeMap: { [key: string]: (date: Date) => START_END_DATE }  = {
    [DATE_RANGE.TODAY]: returnCurrentDate,
    [DATE_RANGE.YESTERDAY]: returnPreviousDate,
    [DATE_RANGE.THIS_WEEK]: getThisWeekDays,
    [DATE_RANGE.LAST_7_DAYS]: getLastSevenWeekDays,
    [DATE_RANGE.LAST_30_DAYS]: getLastThirtyWeekDays,
    [DATE_RANGE.THIS_MONTH]: getCurrentMonthWeekDays,
    [DATE_RANGE.LAST_MONTH]: getLastMonthDays,
    [DATE_RANGE.THIS_YEAR]: getThisYearWeekDays,
    [DATE_RANGE.LAST_YEAR]: getLastYearWeekDays,
    [DATE_RANGE.ALL_TIME]: getAllTimeWeekDays,
}

export const returnDateRange = (date: Date,range: string): START_END_DATE => {
    
    if(dateRangeMap[range]) {
        return dateRangeMap[range](date);
    } 
    
    return {
        startDate: null,
        endDate: null
    }
}