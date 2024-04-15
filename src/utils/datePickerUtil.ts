import { IDate } from "../Interface/IDate";
import { MONTH_MAPPING, MONTH_YEAR_SEPARATOR } from "../constants/DateConstants";

export const frameMonthString = (currentDate: Date): string => {
    return MONTH_MAPPING[currentDate.getMonth()] + MONTH_YEAR_SEPARATOR + currentDate.getFullYear();
}
export const getNumberOfDaysInMonth = (month: number, year: number): number => {
    const thirtyOneDaysMonths = [1, 3, 5, 7, 8, 10, 12];
    const thirtyDaysMonths = [4, 6, 9, 11];

    if (thirtyOneDaysMonths.includes(month + 1)) {
        return 31;
    } else if (thirtyDaysMonths.includes(month + 1)) {
        return 30;
    } else {
        return year % 4 === 0 ? 29 : 28;
    }
}

export const frameDateObject = (date: number, month: number, year: number): IDate => {

    return {
        date,
        month,
        year
    };
}

/**
 * This method returns the array of dates
 * that has to be displayed for a given month.
 * 
 * @param currentDate 
 * @returns 
 */
export const getDayArray = (currentDate: Date): IDate[][] => {

    const currentMonth: number = currentDate.getMonth();
    const currentYear: number = currentDate.getFullYear();

    const prevMonthdate: Date = new Date(currentDate);
    prevMonthdate.setMonth(currentMonth - 1);

    const prevMonth: number = prevMonthdate.getMonth();
    const prevMonthYear: number = prevMonthdate.getFullYear();

    const nextMonthdate: Date = new Date(currentDate);
    nextMonthdate.setMonth(currentMonth + 1);
    const nextMonth: number = nextMonthdate.getMonth();
    const nextMonthYear: number = nextMonthdate.getFullYear();

    const currentMonthStartDate = new Date(currentYear, currentMonth, 1)

    const currentMonthDays: number = getNumberOfDaysInMonth(currentMonth, currentYear);
    const prevMonthdays: number = getNumberOfDaysInMonth(prevMonth, prevMonthYear);
    const currentMonthStartDay: number = currentMonthStartDate.getDay();

    const dayArray: IDate[][] = [];

    let currentDay: number = currentMonthStartDay;
    let currentWeek: number = 0;

    dayArray[currentWeek] = [];

    /**
     * Populate the previous 
     * month dates if the start
     * day of the current week is 
     * not sunday.
     */
    if (currentDay > 0) {
        let prevMonthDateItr = prevMonthdays - (currentDay - 1);
        let prevMonthDay = 0;
        while (prevMonthDateItr <= prevMonthdays) {
            const prevMonthDateObject = frameDateObject(prevMonthDateItr,prevMonth,prevMonthYear);
            dayArray[currentWeek][prevMonthDay] = prevMonthDateObject;
            prevMonthDateItr++;
            prevMonthDay++;
        }
    }

    /**
     * Populate the current month dates.
     */
    let currMonthDateItr = 1;
    while (currMonthDateItr <= currentMonthDays) {
        const prevMonthDateObject = frameDateObject(currMonthDateItr,currentMonth,currentYear);
        dayArray[currentWeek][currentDay] = prevMonthDateObject;
        currentDay++;

        /**
         * Iterate to the next week
         */
        if (currentDay % 7 == 0) {
            currentDay = 0;
            currentWeek++;
            dayArray[currentWeek] = [];
        }
        currMonthDateItr++;
    }

    /**
     * If the current month does not 
     * end on Saturday then populate the
     * next month dates for the remaining
     * days of the week.
     */
    let nextMonthDateItr = 1;
    while (currentDay % 7 !== 0) {
        const nextMonthDateObject = frameDateObject(nextMonthDateItr,nextMonth,nextMonthYear);
        dayArray[currentWeek][currentDay] = nextMonthDateObject;
        nextMonthDateItr++;
        currentDay++;
    }

    /**
     * Populate the 6 week of the current/next month.
     */
    currentDay = 0;
    if(currentWeek % 5 !== 0 || nextMonthDateItr === 1) {
        if(nextMonthDateItr !== 1) {
            currentWeek++;
            dayArray[currentWeek] = [];
        }
        while (currentDay % 7 !== 0 || currentDay === 0) {
            const nextMonthDateObject = frameDateObject(nextMonthDateItr,nextMonth,nextMonthYear);
            dayArray[currentWeek][currentDay] = nextMonthDateObject;
            nextMonthDateItr++;
            currentDay++;
        }
    }

    return dayArray;
}