import React, { useContext, useEffect } from 'react';
import { IDate } from '../../Interface/IDate';
import { DatePickerContext } from '../../context/DatePicker.context';
import { compareDates, isDateBetweenDates, isDateWeekDay, sortDates } from '../../utils/date.util';
import { CALENDAR_TYPE } from '../../constants/DateConstants';
import './date-picker-days.css';

interface IDatePickerDays {
    dates: IDate[][] | undefined;
    calenderType: CALENDAR_TYPE;
    currentDate: Date | null;
    traverseNextMonth: () => void;
    traversePrevMonth: () => void;
}

const DatePickerDays: React.FC<IDatePickerDays> = ({ dates, calenderType, currentDate, traverseNextMonth, traversePrevMonth }) => {

    const { date1, setDate1, date2, setDate2, setNextMonthDate, setPrevMonthDate, endRangeDate, setEndRangeDate } = useContext(DatePickerContext);

    /**
     * This method will set the current month 
     * as the previous month and increment the
     * current month. 
     * @param date 
     */
    const setNextMonthAsPrevious = (date: IDate) => {
        const prevMonth = new Date(date.year, date.month, date.date);
        setPrevMonthDate(prevMonth);
        const nextMonth = new Date(date.year, date.month, date.date);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setNextMonthDate(nextMonth);
    }

    /**
     * This method is responsible to set 
     * the selected date.
     * @param date 
     */
    const selectDate = (date: IDate) => {
        const isWeekDay = isDateWeekDay(date);
        let resetDate = false;
        let datesSelected = false;
        if(isWeekDay) {
            if(date1 && date2) {
                setDate1(date);
                setDate2(null);
                resetDate = true;
            } else if(date1) {
                setDate2(date);
                datesSelected = true;
            } else {
                setDate1(date);
                if(calenderType === CALENDAR_TYPE.next) {
                    resetDate=true;
                }
            }
            const currentMonth = currentDate?.getMonth();

            if(resetDate && calenderType === CALENDAR_TYPE.next) {
                /**
                 * Called when the user the selects 
                 * the start date in the next month 
                 * calender. 
                 */
                setNextMonthAsPrevious(date);
            } else {
                if(calenderType === CALENDAR_TYPE.prev && currentMonth) {
                    /**
                     * If the user selected date is greater than the 
                     * current month and the end date is not 
                     * selected then traverse to the next month.
                     */
                    if(date.month > currentMonth && !datesSelected) {
                        traverseNextMonth();
                    }
                    /**
                     * If the user selects the previous month date in 
                     * the current month calender then traverse to the 
                     * previous month.
                     */
                    if (date.month < currentMonth) {
                        traversePrevMonth();
                    }
                }
                if(calenderType === CALENDAR_TYPE.next && currentMonth) {
                    /**
                     * If the user selects the previous month date in 
                     * the current month calender then traverse to the 
                     * previous month.
                     */
                    if(date.month < currentMonth) {
                        traversePrevMonth();
                    } 
                    /**
                     * If the user selects the next month date in 
                     * the current month calender then traverse to the 
                     * next month.
                     */
                    if(date.month > currentMonth) {
                        traverseNextMonth();
                    }
                }
            }
            
        }
    }

    /**
     * Contains logic related to show the 
     * background and border effects for the
     * date.
     * @param date 
     * @returns string
     */
    const highlightDate = (date: IDate): string => {
        const today = new Date();

        const isWeekDay = isDateWeekDay(date);

        let className = isWeekDay ? 'date' : 'weekend-date';
        
        const isCurrentMonthDate = date.month === currentDate?.getMonth();

        if(date1 && date2) {
            const [startDate,endDate] = sortDates(date1,date2);
            const isBetweenDates = isDateBetweenDates(date,startDate,endDate);

            /**
             * If the date is between the selected range
             * and is in the current month then display 
             * the hover style.
             */
            if(isBetweenDates && isWeekDay && isCurrentMonthDate) {
                className += ' hover';
            }
        } else if(date1 && endRangeDate) {
            const start = date1;
            const [startDate,endDate] = sortDates(start,endRangeDate);
            const isBetweenDates = isDateBetweenDates(date,startDate,endDate);

            /**
             * If the date is between the start and the
             * hovered date and is in the current month
             * then display the hover style.
             */
            if(isBetweenDates && isWeekDay && isCurrentMonthDate) {
                className += ' hover';
            }
        }

        /**
         * If the date is not of the current
         * month then blur the previous and next
         * month dates. 
         */
        if(!isCurrentMonthDate) {
            className += ' opacity';
        }

        /**
         * If the current date is today's date
         * then add the border around the date.
         */
        const highlightCurrentDate =  today.getDate() === date.date &&
         today.getMonth() === date.month &&
         today.getFullYear() === date.year;

         if(highlightCurrentDate) {
            className += ' highlight';
         }

        /**
         * If the current date is equal date1 or date2
         * then add the background style to show the 
         * selected date.
         */
        if (date1) {
            const isCurrentDate1 = compareDates(date, date1);
            if (isCurrentDate1 === 0 && isCurrentMonthDate) {
                className += ' selected-date';
            }
        }

        if (date2) {
            const isCurrentDate2 = compareDates(date, date2);
            if (isCurrentDate2 === 0 && isCurrentMonthDate) {
                className += ' selected-date';
            }
        } 

        return className;
    }

    /**
     * Set the end date range when the 
     * user hovers on a date.
     * @param date
     */
    const mouseHover = (date: IDate) => {
        if(date1 || date2) {
            setEndRangeDate(date);
        }
    }

    useEffect(() => {
        /**
         * Reset the current hover date
         * when any date is selected.
         */
        setEndRangeDate(null);
    },[date1,date2]);

    return (
        <>
            {dates?.map((week, index) => <div key={`week${index}`} className='date-picker-week-days'>
                {week.map((date) => <span key={`day${date.date + date.month + date.year}`} className={highlightDate(date)} onClick={() => selectDate(date)} onMouseOver={() => mouseHover(date)}>{date.date}</span>)}
            </div>)}</>
    )
}

export default DatePickerDays