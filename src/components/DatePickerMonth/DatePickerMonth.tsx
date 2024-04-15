import React, { useContext, useEffect, useState } from 'react';
import './date-picker-month.css';
import { frameMonthString, getDayArray } from '../../utils/datePickerUtil';
import { CALENDAR_TYPE } from '../../constants/DateConstants';
import { IDate } from '../../Interface/IDate';
import { DatePickerContext } from '../../context/DatePicker.context';
import DatePickerWeekHeader from '../DatePickerWeekHeader/DatePickerWeekHeader';
import DatePickerMonthToolbar from '../DatePickerMonthToolbar/DatePickerMonthToolbar';
import DatePickerDays from '../DatePickerDays/DatePickerDays';
import MonthYearPicker from '../MonthYearPicker/MonthYearPicker';


interface IDatePicker {
    calenderType: CALENDAR_TYPE;
}

const DatePickerMonth: React.FC<IDatePicker> = ({ calenderType }) => {

    const { setNextMonthDate, setPrevMonthDate, prevMonthDate, nextMonthDate } = useContext(DatePickerContext);
    const [dates, setDates] = useState<IDate[][]>();
    const [currentMonth, setCurrentMonth] = useState<string>("");
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [monthYearPicker, setMonthYearPicker] = useState<boolean>(false);

    /**
     * This method traverses the current month calender
     * to the previos month.
     */
    const traversePrevMonth = () => {
        if (currentDate) {
            const updatedPrevMonth = new Date(currentDate);
            updatedPrevMonth.setMonth(currentDate.getMonth() - 1);

            /**
             * If the calender type is next and the 
             * updated previous month is equal to the 
             * previous month calender then traverse
             * both the next and previous month
             * calenders.
             */
            if (calenderType === CALENDAR_TYPE.next) {
                let nextMonth = new Date(updatedPrevMonth);
                setNextMonthDate(nextMonth);
                setCurrentDate(nextMonth);
                /**
                 * Check if next and previous month calender
                 * are in the same month and year.
                 */
                const isSameMonthAndYear = updatedPrevMonth.getMonth() === prevMonthDate?.getMonth() &&
                    updatedPrevMonth.getFullYear() === prevMonthDate.getFullYear();
                if (isSameMonthAndYear) {
                    updatedPrevMonth.setMonth(updatedPrevMonth.getMonth() - 1);
                    setPrevMonthDate(updatedPrevMonth);
                }
            } else {
                setPrevMonthDate(updatedPrevMonth);
                setCurrentDate(updatedPrevMonth);
            }
        }

    }

    /**
     * This method traverses the current month 
     * calender to the next month.
     */
    const traverseNextMonth = () => {
        if (currentDate) {
            let nextMonth = new Date(currentDate);
            nextMonth.setMonth(currentDate.getMonth() + 1);

            /**
             * If the calender type is previous and the 
             * updated next month is equal to the 
             * next month calender then traverse
             * both the next and previous month
             * calenders.
             */
            if (calenderType === CALENDAR_TYPE.prev) {
                let currentMonth = new Date(nextMonth);
                setPrevMonthDate(currentMonth);
                setCurrentDate(currentMonth);
                /**
                 * Check if next and previous month calender
                 * are in the same month and year.
                 */
                const isSameMonthAndYear = nextMonth.getMonth() === nextMonthDate?.getMonth() &&
                    nextMonth.getFullYear() === nextMonthDate.getFullYear();
                if (isSameMonthAndYear) {
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    setNextMonthDate(nextMonth);
                }
            } else {
                setNextMonthDate(nextMonth);
                setCurrentDate(nextMonth);
            }
        }
    }

    useEffect(() => {
        /**
         * Set the current date based on the calender type.
         */
        if (calenderType === CALENDAR_TYPE.prev) {
            setCurrentDate(prevMonthDate);
        } else {
            setCurrentDate(nextMonthDate);
        }
    }, [calenderType, prevMonthDate, nextMonthDate]);

    useEffect(() => {
        /**
         * Reset the calender month when the 
         * current date is updated.
         */
        if (currentDate) {
            const monthString = frameMonthString(currentDate);
            setCurrentMonth(monthString)
            const dayArray = getDayArray(currentDate);
            setDates(dayArray);
        }
    }, [currentDate]);

    return (
        <div className='date-picker-month'>
            {monthYearPicker ?
                <MonthYearPicker currentDate={currentDate} currentMonth={currentMonth} setMonthYearPicker={setMonthYearPicker} calenderType={calenderType} /> :
                (<>
                    <DatePickerMonthToolbar currentMonth={currentMonth} traverseNextMonth={traverseNextMonth} traversePrevMonth={traversePrevMonth} setMonthYearPicker={setMonthYearPicker} />
                    <DatePickerWeekHeader />
                    <DatePickerDays dates={dates} calenderType={calenderType} currentDate={currentDate} traverseNextMonth={traverseNextMonth} traversePrevMonth={traversePrevMonth} />
                </>)}
        </div>
    )
}

export default DatePickerMonth