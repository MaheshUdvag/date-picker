import React, { useContext, useEffect, useState } from 'react';
import './date-picker-month.css';
import { getDayArray } from '../../utils/datePickerUtil';
import { CALENDAR_TYPE, MONTH_MAPPING, MONTH_YEAR_SEPARATOR } from '../../constants/DateConstants';
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


    const traversePrevMonth = () => {
        if (currentDate) {
            let prevMonth = new Date(currentDate);
            prevMonth.setMonth(currentDate.getMonth() - 1);

            if (calenderType === CALENDAR_TYPE.next) {
                let nextMonth = new Date(prevMonth);
                setNextMonthDate(nextMonth);
                setCurrentDate(nextMonth);
                if (prevMonth.getMonth() === prevMonthDate?.getMonth() && prevMonth.getFullYear() === prevMonthDate.getFullYear()) {
                    prevMonth.setMonth(prevMonth.getMonth() - 1);
                    setPrevMonthDate(prevMonth);
                }
            } else {
                setPrevMonthDate(prevMonth);
                setCurrentDate(prevMonth);
            }
        }

    }

    const traverseNextMonth = () => {
        if (currentDate) {
            let nextMonth = new Date(currentDate);
            nextMonth.setMonth(currentDate.getMonth() + 1);
            if (calenderType === CALENDAR_TYPE.prev) {
                let currentMonth = new Date(nextMonth);
                setPrevMonthDate(currentMonth);
                setCurrentDate(currentMonth);
                if (nextMonth.getMonth() === nextMonthDate?.getMonth() && nextMonth.getFullYear() === nextMonthDate.getFullYear()) {
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
        if (calenderType === CALENDAR_TYPE.prev) {
            setCurrentDate(prevMonthDate);
        } else {
            setCurrentDate(nextMonthDate);
        }
    }, [calenderType, prevMonthDate, nextMonthDate]);

    useEffect(() => {
        if (currentDate) {
            const monthString = MONTH_MAPPING[currentDate.getMonth()] + MONTH_YEAR_SEPARATOR + currentDate.getFullYear();
            setCurrentMonth(monthString)
            const dayArray = getDayArray(currentDate);
            setDates(dayArray);
        }
    }, [currentDate]);

    return (
        <div className='date-picker-month'>
            {monthYearPicker ? <MonthYearPicker currentDate={currentDate} currentMonth={currentMonth} setCurrentDate={setCurrentDate}  setMonthYearPicker={setMonthYearPicker} calenderType={calenderType} /> : (<>
                <DatePickerMonthToolbar currentMonth={currentMonth} traverseNextMonth={traverseNextMonth} traversePrevMonth={traversePrevMonth} setMonthYearPicker={setMonthYearPicker} />
                <DatePickerWeekHeader />
                <DatePickerDays dates={dates} calenderType={calenderType} currentDate={currentDate} traverseNextMonth={traverseNextMonth} traversePrevMonth={traversePrevMonth} /></>)}

        </div>
    )
}

export default DatePickerMonth